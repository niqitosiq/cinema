import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClipModule } from './clip/clip.module';
import { MinioClientModule } from './minio-client/minio-client.module';
import { UploaderModule } from './uploader/uploader.module';
import { InteractiveModule } from './interactive/interactive.module';

@Module({
  imports: [TypeOrmModule.forRoot(), ClipModule, MinioClientModule, UploaderModule, InteractiveModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
