export class Phrase {
    transcript: string;
    display: string;
    difficulty: number;
    recordFile: Blob;
    fileName: string;
    recordDuration: number;
    recordLenght: number;


    constructor(transcript: string, display: string = null){
        this.transcript = transcript;
        this.display = display == null ? transcript : display;
    }
}
