import { Module } from '@nestjs/common';
import { MinioClientModule } from 'src/minio-client/minio-client.module';
import { UploaderService } from './uploader.service';
import { UploaderController } from './uploader.controller';

@Module({
  imports: [
    MinioClientModule
  ],
  providers: [UploaderService],
  controllers: [UploaderController]
})
export class UploaderModule {}
