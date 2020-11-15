export class CreateClipDto {
    readonly videoUrl: string;
    
    readonly musicUrl?: string;

    readonly previewUrl?: string;

    readonly likeCounter: number = 0;

    readonly viewCounter: number = 0;

    readonly desc?: string; 
}