import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { CreateChoiceDto } from './dto/create-choice.dto';
import { UpdateChoiceDto } from './dto/update-choice.dto';
import { Choice } from './entities/choice.entity';
import { ChoiceNotFoundException } from './exceptions/choice.exceptions';

@Injectable()
export class ChoiceService {
    constructor(
        @InjectRepository(Choice)
        private readonly choiceRepository: Repository<Choice>
    ) {}

    async create(choice: CreateChoiceDto): Promise<Choice> {
        const newChoice = this.choiceRepository.create(choice)
        return await this.choiceRepository.save(newChoice)
    }

    async findAll(): Promise<Choice[]> {
        return await this.choiceRepository.find();
    }

    async findOneById(choiceId: number): Promise<Choice> {
        return await this.choiceRepository.findOne({id: choiceId})
    }

    async updateOne(choiceId: number, updateChoice: DeepPartial<UpdateChoiceDto>): Promise<Choice> {
        await this.choiceRepository.update({id: choiceId}, updateChoice);
        const updatedChoice = await this.choiceRepository.findOne(choiceId);
        if (updatedChoice) {
            return updatedChoice
        } 
        throw new ChoiceNotFoundException(choiceId);
    }

    async deleteOne(choiceId: number): Promise<Choice[]> {
        const choiceToRemove = await this.choiceRepository.find({id: choiceId});
        return await this.choiceRepository.remove(choiceToRemove);
    }
}
