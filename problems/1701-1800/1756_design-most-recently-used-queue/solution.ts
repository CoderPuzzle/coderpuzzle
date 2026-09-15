// The queue lives in consecutive blocks of about sqrt(n) slots: fetch walks
// the blocks, subtracting each size from k, to find the kth element, lifts it
// out of its own block, and re-appends it at the tail — an empty block is
// dropped, a full tail rolls the value into a fresh block.
class MRUQueue {
    private blocks: number[][];
    private width: number;

    constructor(n: number) {
        this.width = Math.floor(Math.sqrt(n)) + 1;
        this.blocks = [];
        for (let start = 1; start <= n; start += this.width) {
            const end = Math.min(start + this.width, n + 1);
            const block: number[] = [];
            for (let value = start; value < end; value++) {
                block.push(value);
            }
            this.blocks.push(block);
        }
    }

    fetch(k: number): number {
        let index = 0;
        while (k > this.blocks[index].length) {
            k -= this.blocks[index].length;
            index++;
        }
        const block = this.blocks[index];
        const value = block.splice(k - 1, 1)[0];
        if (block.length === 0) {
            this.blocks.splice(index, 1);
        }
        const tail = this.blocks[this.blocks.length - 1];
        if (tail === undefined || tail.length >= this.width) {
            this.blocks.push([value]);
        } else {
            tail.push(value);
        }
        return value;
    }
}
