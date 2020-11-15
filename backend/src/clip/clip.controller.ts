import { Controller, Post, Body, Get, Param, Put, Delete } from "@nestjs/common";
import { ClipService } from "./clip.service";
import { CreateClipDto } from "./dto/create-clip.dto";
import { UpdateClipDto } from "./dto/update-clip.dto";
import { Clip } from "./entities/clip.entity";

@Controller('clip')
export class ClipController {
    constructor(
        private readonly clipService: ClipService,
    ) {}

    @Post()
    async create(@Body() createClipDto: CreateClipDto): Promise<Clip> {
        console.log(createClipDto)
        return await this.clipService.create(createClipDto)
    }

    @Get()
    async findAll(): Promise<Clip[]> {
        return await this.clipService.findAll()
    }

    @Get(':id')
    async findOneById(@Param('id') clipId: number): Promise<Clip> {
        return await this.clipService.findOneById(clipId)
    }

    @Put(':id')
    async update(@Param('id') clipId: number, @Body() updateClipDto: UpdateClipDto): Promise<Clip> {
        return await this.clipService.updateOne(clipId, updateClipDto);
    }

    @Delete(':id')
    async remove(@Param('id') clipId: number): Promise<Clip[]> {
        return await this.clipService.deleteOne(clipId);
    }
}