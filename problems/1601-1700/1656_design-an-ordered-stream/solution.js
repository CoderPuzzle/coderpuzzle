class OrderedStream {
    // One slot per id (index 0 unused) plus ptr, the next id the output is
    // waiting for.
    constructor(n) {
        this.slots = new Array(n + 1);
        this.ptr = 1;
    }

    insert(idKey, value) {
        this.slots[idKey] = value;
        const chunk = [];
        while (this.ptr < this.slots.length && this.slots[this.ptr] !== undefined) {
            chunk.push(this.slots[this.ptr]);
            this.ptr++;
        }
        return chunk;
    }
}
