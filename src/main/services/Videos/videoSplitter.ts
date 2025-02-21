import ffmpeg from "fluent-ffmpeg";
import fs from "fs";
import path from "path";
import AppError from "../../errors/AppError";
import sendVideosToStories from "../BWhatsapp/sendVideosToStories";
import BWhatsapp from "../BWhatsapp/bwa";
import { logger } from "../../utils/logger";

export default async function videoSplitter(videoPath: string, sessionId: string) {
  try {
    const session = BWhatsapp.getInstance(sessionId);
    if (session) {
      const outputDir = path.join(__dirname, 'output'); // Diretório para armazenar as partes
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
      };

      // Comando para dividir o vídeo em partes de 30 segundos
      await new Promise<void>((resolve, reject) => {
        ffmpeg(videoPath)
          .output(path.join(outputDir, 'output-%03d.mp4')) // Nome dos arquivos divididos
          .audioCodec('aac')
          .videoCodec('libx264')
          .outputOptions([
            '-f', 'segment', // Define o formato de segmento
            '-segment_time', '29', // Divide a cada 30 segundos
            '-reset_timestamps', '1', // Reseta os timestamps a cada novo arquivo
          ])
          .on('end', () => resolve()) // Sucesso
          .on('error', (err) => reject(err)) // Erro
          .run();
      });
      // Retorna os caminhos dos vídeos gerados
      const videoFiles = fs.readdirSync(outputDir)
        .filter(file => file.endsWith(".mp4")) // Filtra apenas arquivos MP4
        .map(file => path.join(outputDir, file)); // Retorna caminhos completos
      await sendVideosToStories(session.getSocket(), videoFiles);
    }else{
      throw new AppError(`Session ID not found. SessionID: ${sessionId}`);
    }
  } catch (error) {
    throw new AppError((error as Error).message, 500);
  }
}