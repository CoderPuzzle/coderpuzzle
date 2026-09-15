// One queue, rotated on push: the front is always the stack top, so
// pop/top/empty are single queue operations on the front.
class MyStack {
    constructor() {
        this.queue = [];
    }

    push(x) {
        this.queue.push(x);
        // Requeue everything that was below x, so x reaches the front.
        const rotations = this.queue.length - 1;
        for (let i = 0; i < rotations; ++i) this.queue.push(this.queue.shift());
    }

    pop() {
        return this.queue.shift();
    }

    top() {
        return this.queue[0];
    }

    empty() {
        return this.queue.length === 0;
    }
}
