class FirstUnique {
    private counts = new Map<number, number>();
    private queue: number[] = [];
    private head = 0;

    constructor(nums: number[]) {
        for (const value of nums) {
            this.add(value);
        }
    }

    showFirstUnique(): number {
        while (this.head < this.queue.length && this.counts.get(this.queue[this.head])! > 1) {
            this.head++;
        }
        return this.head < this.queue.length ? this.queue[this.head] : -1;
    }

    add(value: number): void {
        this.counts.set(value, (this.counts.get(value) || 0) + 1);
        this.queue.push(value);
    }
}
