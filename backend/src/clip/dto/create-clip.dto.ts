export class CreateClipDto {
    readonly videoUrl: string;
    
    readonly musicUrl?: string;

    readonly previewUrl?: string;

    readonly likeCounter: number = 0;

    readonly viewCounyer: number = 0;

    readonly desc?: string; 
}