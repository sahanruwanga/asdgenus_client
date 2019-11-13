export class Result {

    id: number;
    eegId: number;
    subjectId: number;
    result: string;
    resultDescription: string;
    dateOfTaken: string;


    constructor(id: number, eegId: number, subjectId: number, result: string, resultDescription: string, dateOfTaken: string) {
        this.id = id;
        this.eegId = eegId;
        this.subjectId = subjectId;
        this.result = result;
        this.resultDescription = resultDescription;
        this.dateOfTaken = dateOfTaken;
    }
}
