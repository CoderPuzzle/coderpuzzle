class MinIndexHeap {
    private readonly values: number[] = [];

    get size(): number {
        return this.values.length;
    }

    peek(): number {
        return this.values[0];
    }

    push(value: number): void {
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

    pop(): number {
        const root = this.values[0];
        const last = this.values.pop()!;
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
    private readonly stacks: number[][] = [];
    private readonly vacant = new MinIndexHeap();

    constructor(private readonly capacity: number) {}

    push(val: number): void {
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

    pop(): number {
        while (this.stacks.length > 0 && this.stacks[this.stacks.length - 1].length === 0) {
            this.stacks.pop();
        }
        if (this.stacks.length === 0) {
            return -1;
        }
        return this.stacks[this.stacks.length - 1].pop()!;
    }

    popAtStack(index: number): number {
        if (index < 0 || index >= this.stacks.length || this.stacks[index].length === 0) {
            return -1;
        }
        const value = this.stacks[index].pop()!;
        this.vacant.push(index);
        return value;
    }
}
