import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ChoiceService } from './choice.service';
import { CreateChoiceDto } from './dto/create-choice.dto';
import { UpdateChoiceDto } from './dto/update-choice.dto';
import { Choice } from './entities/choice.entity';

@Controller('choice')
export class ChoiceController {
    constructor(
        private readonly choiceService: ChoiceService,
    ) {}

    @Post()
    async create(@Body() createChoiceDto: CreateChoiceDto): Promise<Choice> {
        return await this.choiceService.create(createChoiceDto)
    }

    @Get()
    async findAll(): Promise<Choice[]> {
        return await this.choiceService.findAll()
    }

    @Get(':id')
    async findOneById(@Param('id') choiceId: number): Promise<Choice> {
        return await this.choiceService.findOneById(choiceId)
    }

    @Put(':id')
    async update(@Param('id') choiceId: number, @Body() updateChoiceDto: UpdateChoiceDto): Promise<Choice> {
        return await this.choiceService.updateOne(choiceId, updateChoiceDto);
    }

    @Delete(':id')
    async remove(@Param('id') choiceId: number): Promise<Choice[]> {
        return await this.choiceService.deleteOne(choiceId);
    }
}
