class MinIndexHeap {
    constructor() {
        this.values = [];
    }

    get size() {
        return this.values.length;
    }

    peek() {
        return this.values[0];
    }

    push(value) {
        this.values.push(value);
        let index = this.values.length - 1;
        while (index > 0) {
            const parent = Math.floor((index - 1) / 2);
            if (this.values[parent] <= value) {
                break;
            }
            this.values[index] = this.values[parent];
            index = parent;
        }
        this.values[index] = value;
    }

    pop() {
        const root = this.values[0];
        const last = this.values.pop();
        if (this.values.length > 0) {
            let index = 0;
            while (true) {
                const left = index * 2 + 1;
                if (left >= this.values.length) {
                    break;
                }
                const right = left + 1;
                const child = right < this.values.length && this.values[right] < this.values[left] ? right : left;
                if (this.values[child] >= last) {
                    break;
                }
                this.values[index] = this.values[child];
                index = child;
            }
            this.values[index] = last;
        }
        return root;
    }
}

class DinnerPlates {
    constructor(capacity) {
        this.capacity = capacity;
        this.stacks = [];
        this.vacant = new MinIndexHeap();
    }

    push(val) {
        while (this.vacant.size > 0) {
            const index = this.vacant.peek();
            if (index >= this.stacks.length || this.stacks[index].length === this.capacity) {
                this.vacant.pop();
            } else {
                break;
            }
        }
        if (this.vacant.size > 0) {
            const index = this.vacant.pop();
            this.stacks[index].push(val);
            if (this.stacks[index].length < this.capacity) {
                this.vacant.push(index);
            }
        } else if (this.stacks.length > 0 && this.stacks[this.stacks.length - 1].length < this.capacity) {
            this.stacks[this.stacks.length - 1].push(val);
        } else {
            this.stacks.push([val]);
        }
    }

    pop() {
        while (this.stacks.length > 0 && this.stacks[this.stacks.length - 1].length === 0) {
            this.stacks.pop();
        }
        if (this.stacks.length === 0) {
            return -1;
        }
        return this.stacks[this.stacks.length - 1].pop();
    }

    popAtStack(index) {
        if (index < 0 || index >= this.stacks.length || this.stacks[index].length === 0) {
            return -1;
        }
        const value = this.stacks[index].pop();
        this.vacant.push(index);
        return value;
    }
}
