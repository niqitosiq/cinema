import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import { config } from './config'
import { BufferedFile } from './file.model';
import * as crypto from 'crypto'
import { minioRO } from './minio-client.interface';

@Injectable()
export class MinioClientService {
    private readonly logger: Logger;
    private readonly baseBucket = config.MINIO_BUCKET

  public get client(): any {
    return this.minio.client
  }

  constructor(
    private readonly minio: MinioService,
  ) {
    this.logger = new Logger('MinioStorageService');
  }

  public async upload(file: BufferedFile, baseBucket: string = this.baseBucket): Promise<minioRO>  {
    if(!(file.mimetype.includes('jpeg') 
    || file.mimetype.includes('png') 
    || file.mimetype.includes('mp4') 
    || file.mimetype.includes('mp3'))) {
      throw new HttpException('Error uploading file, wrong ext', HttpStatus.BAD_REQUEST)
    }
    const temp_filename = Date.now().toString()
    const hashedFileName = crypto.createHash('md5').update(temp_filename).digest("hex");
    const ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
    const metaData = {
      'Content-Type': file.mimetype,
    };
    const filename = hashedFileName + ext
    const fileName = `${filename}`;
    const fileBuffer = file.buffer;
    this.client.putObject(baseBucket, fileName, fileBuffer, metaData, function(err) {
      if(err) throw new HttpException(`Error uploading file, cant put; ${err}`, HttpStatus.BAD_REQUEST)
    })

    return {
      url: `${config.MINIO_ENDPOINT}:${config.MINIO_PORT}/${config.MINIO_BUCKET}/${filename}` 
    }
  }

  async delete(objetName: string, baseBucket: string = this.baseBucket): Promise<any> {
    return await this.client.removeObject(baseBucket, objetName, function(err) {
      if(err) throw new HttpException("Something wrong", HttpStatus.BAD_REQUEST)
    })
  }
}
