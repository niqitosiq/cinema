import { Module } from '@nestjs/common';
import { ClipService } from './clip.service';
import { ClipController } from './clip.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clip } from './entities/clip.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Clip])],
  providers: [ClipService],
  controllers: [ClipController]
})
export class ClipModule {}
