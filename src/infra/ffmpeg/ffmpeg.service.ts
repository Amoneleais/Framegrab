import { Injectable } from '@nestjs/common';
import { spawn, SpawnOptions } from 'child_process';
import * as path from 'path';

@Injectable()
export class FFmpegService {
  private safeSpawn(
    command: string,
    args: string[],
    options: SpawnOptions = {},
  ) {
    const env: NodeJS.ProcessEnv = {
      ...process.env,
      ...(options.env ?? {}),
    };
    if (process.platform !== 'win32') {
      env.PATH = `${env.PATH ?? ''}:/usr/bin:/bin:/usr/local/bin`;
    }
    return spawn(command, args, {
      ...options,
      env,
    });
  }

  async extractFrames(
    inputPath: string,
    outputDir: string,
    interval: number = 1,
  ): Promise<void> {
    const args = [
      '-hide_banner',
      '-loglevel',
      'info',
      '-i',
      inputPath,
      '-vf',
      `fps=1/${interval}`,
      path.join(outputDir, 'frame-%d.jpg'),
    ];
    await new Promise<void>((resolve, reject) => {
      const ffmpeg = this.safeSpawn('ffmpeg', args);
      let stderr = '';
      ffmpeg.stderr?.on('data', (data: Buffer) => {
        stderr += data.toString();
      });
      ffmpeg.on('close', (code) => {
        if (code === 0) {
          resolve();
          return;
        }
        const numericCode = code ?? -1;
        const signedCode =
          numericCode > 2147483647 ? numericCode - 4294967296 : numericCode;
        reject(
          new Error(`ffmpeg exited with code ${signedCode}. stderr: ${stderr}`),
        );
      });
      ffmpeg.on('error', (err) => {
        reject(
          new Error(
            `Failed to start ffmpeg: ${err.message}. stderr: ${stderr}`,
          ),
        );
      });
    });
  }

  async getDuration(filePath: string): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      const ffprobe = this.safeSpawn('ffprobe', [
        '-v',
        'error',
        '-show_entries',
        'format=duration',
        '-of',
        'default=noprint_wrappers=1:nokey=1',
        filePath,
      ]);
      let output = '';
      ffprobe.stdout?.on('data', (data: Buffer) => {
        output += data.toString();
      });
      ffprobe.on('close', (code) => {
        if (code === 0 && output) {
          resolve(parseFloat(output));
        } else {
          reject(
            new Error(
              `ffprobe exited with code ${code} or produced no output.`,
            ),
          );
        }
      });
      ffprobe.on('error', (err) => {
        reject(new Error(`Failed to start ffprobe: ${err.message}`));
      });
    });
  }
}
