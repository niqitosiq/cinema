import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChoiceController } from './choice.controller';
import { ChoiceService } from './choice.service';
import { Choice } from './entities/choice.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Choice])],
    controllers: [ChoiceController],
    providers: [ChoiceService],
  })
  export class InteractiveModule {}