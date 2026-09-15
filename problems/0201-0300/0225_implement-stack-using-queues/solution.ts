// One queue, rotated on push: the front is always the stack top, so
// pop/top/empty are single queue operations on the front.
class MyStack {
    private queue: number[];

    constructor() {
        this.queue = [];
    }

    push(x: number) {
        this.queue.push(x);
        // Requeue everything that was below x, so x reaches the front.
        const rotations = this.queue.length - 1;
        for (let i = 0; i < rotations; ++i) this.queue.push(this.queue.shift() as number);
    }

    pop(): number {
        return this.queue.shift() as number;
    }

    top(): number {
        return this.queue[0];
    }

    empty(): boolean {
        return this.queue.length === 0;
    }
}
