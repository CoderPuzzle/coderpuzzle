class FirstUnique {
    constructor(nums) {
        this.counts = new Map();
        this.queue = [];
        this.head = 0;
        for (const value of nums) {
            this.add(value);
        }
    }

    showFirstUnique() {
        while (this.head < this.queue.length && this.counts.get(this.queue[this.head]) > 1) {
            this.head++;
        }
        return this.head < this.queue.length ? this.queue[this.head] : -1;
    }

    add(value) {
        this.counts.set(value, (this.counts.get(value) || 0) + 1);
        this.queue.push(value);
    }
}
