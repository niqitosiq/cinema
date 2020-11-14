import { Injectable } from '@nestjs/common';
import { BufferedFile } from 'src/minio-client/file.model';
import { MinioClientService } from 'src/minio-client/minio-client.service';
import { uploaderRO } from './uploader.interface';

@Injectable()
export class UploaderService {
    constructor(
        private minioClientService: MinioClientService
      ) {}
    
      async uploadSingle(file: BufferedFile): Promise<uploaderRO> {
    
        const uploaded_image = await this.minioClientService.upload(file)
    
        return {
          image_url: uploaded_image.url,
          message: "Successfully uploaded to MinIO S3"
        }
      }
}
