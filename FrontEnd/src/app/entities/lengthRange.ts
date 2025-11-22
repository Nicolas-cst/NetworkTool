export class LengthRange {
    min: number;
    max: number;

    constructor(min : number, max : number) {
        this.min = min;
        this.max = max;
    }

    display(): string {
        return `[${this.min} - ${this.max}]`;
    }
}
