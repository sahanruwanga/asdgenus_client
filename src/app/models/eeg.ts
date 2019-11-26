export class Eeg {

    id: number;
    numberOfChannels: number;
    subjectId: number;
    channelNames: string [];
    duration: string;
    recordedDate: string;
    dataLocation: string;
    signalLocation: string;
    signalImage: string;

    constructor(id: number, numberOfChannels: number, subjectId: number, channelNames: string[],
                duration: string, recordedDate: string, dataLocation: string, signalLocation: string, signalImage: string) {
        this.id = id;
        this.numberOfChannels = numberOfChannels;
        this.subjectId = subjectId;
        this.channelNames = channelNames;
        this.duration = duration;
        this.recordedDate = recordedDate;
        this.dataLocation = dataLocation;
        this.signalLocation = signalLocation;
        this.signalImage = signalImage;
    }
}
