import React, { useState } from 'react'
import Versions from './components/Versions'
import electronLogo from './assets/electron.svg'

function App(): JSX.Element {
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [statusMessage, setStatusMessage] = useState<string>('')

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null
    if (file) {
      setVideoFile(file)
    }
  }

  const handleVideoUpload = async () => {
    if (videoFile) {
      setStatusMessage('Dividindo o vídeo em partes de 30 segundos...')
      // Chama a função para dividir o vídeo no backend (Electron)
      try {
        const videoPath = videoFile.path // Pega o caminho do arquivo
        // Enviar para o backend para processamento de divisão
        await window.electron.ipcRenderer.invoke('upload-video-and-split', videoPath)
        setStatusMessage('Vídeo dividido e pronto para o envio!')
      } catch (error) {
        setStatusMessage('Falha ao dividir o vídeo.')
      }
    }
  }

  return (
    <>
      <img alt="logo" className="logo" src={electronLogo} />
      <div className="text">
        WAStories upload your videos to your <span className="react">WhatsApp</span>
        &nbsp; <span className="ts">stories</span>
      </div>

      <div className="actions">
        <div className="action">
          <input type="file" accept="video/*" onChange={handleVideoChange} />
        </div>
        <div className="action">
          <button onClick={handleVideoUpload}>Dividir e Enviar para o WhatsApp</button>
        </div>
      </div>
      <div className="tip">{statusMessage}</div>

      <Versions />
      <div className="tip">Developed by <span className="react"><a href='https://danielsouza-portfolio.vercel.app'>Daniel Souza</a></span></div>
    </>
  )
}

export default App
