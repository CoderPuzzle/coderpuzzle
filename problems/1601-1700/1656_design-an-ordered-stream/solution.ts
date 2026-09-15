class OrderedStream {
    // One slot per id (index 0 unused) plus ptr, the next id the output is
    // waiting for.
    private slots: (string | undefined)[];
    private ptr: number;

    constructor(n: number) {
        this.slots = new Array<string | undefined>(n + 1);
        this.ptr = 1;
    }

    insert(idKey: number, value: string): string[] {
        this.slots[idKey] = value;
        const chunk: string[] = [];
        while (this.ptr < this.slots.length && this.slots[this.ptr] !== undefined) {
            chunk.push(this.slots[this.ptr]!);
            this.ptr++;
        }
        return chunk;
    }
}
