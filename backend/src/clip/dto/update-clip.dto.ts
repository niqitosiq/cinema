import { maskType } from "../interfaces/mask.interface";

export class UpdateClipDto {
    readonly linkedCinema: string;
    
    readonly videoUrl: string;
    
    readonly musicUrl: string;

    readonly previewUrl: string;

    readonly likeCounter: number;

    readonly viewCounter: number;

    readonly desc: string; 

    readonly mask?: maskType;
}