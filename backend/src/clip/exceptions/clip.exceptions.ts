export class ClipNotFoundException extends Error {
    constructor(id: number) {
        const message = `Clip where id = ${id} is not exist`;
        super(message);
        this.name = 'ClipNotFoundException' 
    }
}