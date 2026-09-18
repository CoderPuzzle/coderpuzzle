class SeatManager {
    // Largest seat number ever reserved: fresh seats march upward from here.
    private nextSeat: number;
    // Binary min-heap holding ONLY currently returned seats — never the
    // untouched ones.
    private returned: number[];

    constructor(n: number) {
        this.nextSeat = 1;
        this.returned = [];
    }

    reserve(): number {
        // Prefer the smallest returned seat; the top is always < nextSeat,
        // so the two sources of free seats never overlap.
        if (this.returned.length > 0 && this.returned[0] < this.nextSeat) {
            return this.popMin();
        }
        // No outstanding returns: the next fresh seat is simply nextSeat.
        return this.nextSeat++;
    }

    unreserve(seat: number): void {
        // The monotone counter march is disrupted by exactly this one seat.
        this.pushMin(seat);
    }

    private pushMin(seat: number): void {
        const heap = this.returned;
        heap.push(seat);
        for (let child = heap.length - 1; child > 0;) {
            const parent = (child - 1) >> 1;
            if (heap[parent] <= heap[child]) {
                break;
            }
            [heap[parent], heap[child]] = [heap[child], heap[parent]];
            child = parent;
        }
    }

    private popMin(): number {
        const heap = this.returned;
        const top = heap[0];
        const last = heap.pop() as number;
        if (heap.length > 0) {
            heap[0] = last;
            for (let parent = 0; ;) {
                const left = parent * 2 + 1;
                const right = left + 1;
                let smallest = parent;
                if (left < heap.length && heap[left] < heap[smallest]) {
                    smallest = left;
                }
                if (right < heap.length && heap[right] < heap[smallest]) {
                    smallest = right;
                }
                if (smallest === parent) {
                    break;
                }
                [heap[parent], heap[smallest]] = [heap[smallest], heap[parent]];
                parent = smallest;
            }
        }
        return top;
    }
}
