import QRCodeRenderer from "@renderer/components/QRCodeRenderer";
import Versions from "@renderer/components/Versions";
import VideoUpload from "@renderer/components/VideoUpload";
import { ConnectionProvider } from "@renderer/context/ConnectionContext";

const Home = () => {
  return (
    <ConnectionProvider>
      <QRCodeRenderer />
      <VideoUpload />
      <Versions />
    </ConnectionProvider>
  );
};
export default Home;