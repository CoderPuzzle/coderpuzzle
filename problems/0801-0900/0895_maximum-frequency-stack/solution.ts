class FreqStack {
    private freq: Map<number, number>;
    private groups: number[][];
    private maxfreq: number;

    constructor() {
        this.freq = new Map();
        this.groups = [];
        this.maxfreq = 0;
    }

    push(val: number): void {
        const frequency = (this.freq.get(val) || 0) + 1;
        this.freq.set(val, frequency);
        while (this.groups.length < frequency) {
            this.groups.push([]);
        }
        this.groups[frequency - 1].push(val);
        if (frequency > this.maxfreq) {
            this.maxfreq = frequency;
        }
    }

    pop(): number {
        const top = this.groups[this.maxfreq - 1];
        const val = top.pop()!;
        this.freq.set(val, this.maxfreq - 1);
        if (top.length === 0) {
            this.maxfreq--;
        }
        return val;
    }
}
