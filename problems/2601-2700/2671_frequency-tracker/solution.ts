// Two counters kept in lockstep: number -> how many copies sit in the
// structure, and frequency -> how many numbers currently occur that often.
// Each add/delete moves one number between adjacent frequency buckets, so
// any hasFrequency question becomes a single lookup.
class FrequencyTracker {
    private countOf: Map<number, number>;
    private numbersAt: Map<number, number>;

    constructor() {
        this.countOf = new Map();
        this.numbersAt = new Map();
    }

    add(number: number): void {
        const count = this.countOf.get(number) ?? 0;
        this.countOf.set(number, count + 1);
        if (count > 0) {
            this.numbersAt.set(count, this.numbersAt.get(count)! - 1);
        }
        this.numbersAt.set(count + 1, (this.numbersAt.get(count + 1) ?? 0) + 1);
    }

    deleteOne(number: number): void {
        const count = this.countOf.get(number) ?? 0;
        // The structure may not contain it; delete nothing then.
        if (count === 0) return;
        this.countOf.set(number, count - 1);
        this.numbersAt.set(count, this.numbersAt.get(count)! - 1);
        if (count > 1) {
            this.numbersAt.set(count - 1, (this.numbersAt.get(count - 1) ?? 0) + 1);
        }
    }

    hasFrequency(frequency: number): boolean {
        return (this.numbersAt.get(frequency) ?? 0) > 0;
    }
}
