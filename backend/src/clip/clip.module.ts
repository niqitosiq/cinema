import { Module } from '@nestjs/common';
import { ClipService } from './clip.service';
import { ClipController } from './clip.controller';

@Module({
  providers: [ClipService],
  controllers: [ClipController]
})
export class ClipModule {}
