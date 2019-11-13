export class Patient {
    id: number;
    age: number;
    name: string;
    gender: string;


    constructor(id: number, age: number, name: string, gender: string) {
        this.id = id;
        this.age = age;
        this.name = name;
        this.gender = gender;
    }
}
