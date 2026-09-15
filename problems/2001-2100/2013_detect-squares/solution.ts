class DetectSquares {
    private frequencies: Map<number, number>;

    constructor() {
        this.frequencies = new Map();
    }

    add(point: number[]) {
        const key = this.encode(point[0], point[1]);
        this.frequencies.set(key, (this.frequencies.get(key) ?? 0) + 1);
    }

    count(point: number[]): number {
        const [x, y] = point;
        let total = 0;
        for (const [key, horizontal] of this.frequencies) {
            const x2 = Math.floor(key / 1001);
            const y2 = key % 1001;
            if (y2 !== y || x2 === x) continue;
            const distance = Math.abs(x2 - x);
            total += horizontal * this.frequency(x, y + distance) * this.frequency(x2, y + distance);
            total += horizontal * this.frequency(x, y - distance) * this.frequency(x2, y - distance);
        }
        return total;
    }

    private frequency(x: number, y: number): number {
        if (y < 0 || y > 1000) return 0;
        return this.frequencies.get(this.encode(x, y)) ?? 0;
    }

    private encode(x: number, y: number): number {
        return x * 1001 + y;
    }
}
