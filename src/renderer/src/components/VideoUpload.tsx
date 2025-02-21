import Box from "@renderer/@emotion-custom/Box";
import Button from "@renderer/@emotion-custom/Button";
import Loading from "@renderer/@emotion-custom/Loading";
import { ConnectionContext } from "@renderer/context/ConnectionContext";
import { useContext, useState } from "react";

const VideoUpload = (): JSX.Element => {
  const { sessionData } = useContext(ConnectionContext);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setVideoFile(file);
      event.target.files = null;
    }
    setLoading(false);
  }
  const handleUploadVideo = async () => {
    setLoading(true);
    if (videoFile) {
      try {
        const videoPath = videoFile.path;
        await window.electron.ipcRenderer.invoke('upload-video-and-split', videoPath, sessionData.id);
      } catch (err) {
        console.error((err as Error).message);
      }
    }
    setLoading(false);
  }
  return (
    
    <Box style={{ textAlign: 'center' }}>
      {!loading && sessionData.status === "open" ?
        <>
          <input type="file" accept="video/*" onChange={handleVideoChange} />
          <Button onClick={handleUploadVideo}>Dividir e enviar para o WhatsApp</Button>
        </> 
        : sessionData.status === "open" && <Loading />}
    </Box>
  )
}
export default VideoUpload;