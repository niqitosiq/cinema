import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { DeepPartial, Repository } from "typeorm"
import { CreateClipDto } from "./dto/create-clip.dto"
import { UpdateClipDto } from "./dto/update-clip.dto"
import { Clip } from "./entities/clip.entity"
import { ClipNotFoundException } from "./exceptions/clip.exceptions"

@Injectable()
export class ClipService {
    constructor(
        @InjectRepository(Clip)
        private readonly clipRepository: Repository<Clip>
    ) {}

    async create(clip: CreateClipDto): Promise<Clip> {
        const newClip = this.clipRepository.create(clip)
        return await this.clipRepository.save(newClip)
    }

    async findAll(): Promise<Clip[]> {
        return await this.clipRepository.find();
    }

    async findOneById(clipId: number): Promise<Clip> {
        return await this.clipRepository.findOne({id: clipId})
    }

    async updateOne(clipId: number, updateClip: DeepPartial<UpdateClipDto>): Promise<Clip> {
        await this.clipRepository.update({id: clipId}, updateClip);
        const updatedClip = await this.clipRepository.findOne(clipId);
        if (updatedClip) {
            return updatedClip
        } 
        throw new ClipNotFoundException(clipId);
    }

    async deleteOne(clipId: number): Promise<Clip[]> {
        const clipToRemove = await this.clipRepository.find({id: clipId});
        return await this.clipRepository.remove(clipToRemove);
    }
}