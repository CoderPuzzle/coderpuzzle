class DataStream {
    // Running length of the current suffix of matched values: a match
    // grows it, any other number resets it to zero, and consec is just
    // "has the streak reached k". The window of the last k integers is
    // summarized in one integer — nothing is buffered.
    private readonly value: number;
    private readonly k: number;
    private streak: number;

    constructor(value: number, k: number) {
        this.value = value;
        this.k = k;
        this.streak = 0;
    }

    consec(num: number): boolean {
        this.streak = num === this.value ? this.streak + 1 : 0;
        return this.streak >= this.k;
    }
}
