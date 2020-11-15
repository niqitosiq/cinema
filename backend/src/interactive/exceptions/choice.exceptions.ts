export class ChoiceNotFoundException extends Error {
    constructor(id: number) {
        const message = `Choice where id = ${id} is not exist`;
        super(message);
        this.name = 'ChoiceNotFoundException' 
    }
}