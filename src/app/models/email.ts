export class Email {

    to: string;
    from: string;
    message: string;
    subject: string;

    constructor(to: string, from: string, message: string, subject: string) {
        this.to = to;
        this.from = from;
        this.message = message;
        this.subject = subject;
    }
}
