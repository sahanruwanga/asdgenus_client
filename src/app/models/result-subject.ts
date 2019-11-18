import {Result} from './result';
import {Eeg} from './eeg';

export class ResultSubject {

    resultId: number;
    result: string;
    resultDescription: string;
    dateOfTaken: string;

    eegId: number;
    numberOfChannels: number;
    channelNames: string[];
    duration: string;
    recordedDate: string;
    dataLocation: string;
    signalLocation: string;

    subjectId: number;
    age: number;
    subjectName: string;
    subjectGender: string;

    constructor(resultId: number, result: string, resultDescription: string, dateOfTaken: string,
                eegId: number, numberOfChannels: number, channelNames: string[], duration: string,
                recordedDate: string, dataLocation: string, signalLocation: string,
                subjectId: number, age: number, subjectName: string, subjectGender: string) {
        this.resultId = resultId;
        this.result = result;
        this.resultDescription = resultDescription;
        this.dateOfTaken = dateOfTaken;
        this.eegId = eegId;
        this.numberOfChannels = numberOfChannels;
        this.channelNames = channelNames;
        this.duration = duration;
        this.recordedDate = recordedDate;
        this.dataLocation = dataLocation;
        this.signalLocation = signalLocation;
        this.subjectId = subjectId;
        this.age = age;
        this.subjectName = subjectName;
        this.subjectGender = subjectGender;
    }
}
