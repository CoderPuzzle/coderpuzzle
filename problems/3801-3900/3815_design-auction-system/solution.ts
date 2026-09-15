// Per item, a lazy-deletion max-heap of (-amount, -userId, seq) entries:
// the top is the live leader once every stale top has been popped. A seq
// map names the newest entry per (userId, itemId) pair, so addBid/updateBid
// just push a newer entry (the old one turns stale by its seq) and
// removeBid drops the pair. The heap orders by amount first, userId
// second, which is exactly the stated tie-break.
class AuctionSystem {
    private heaps: Map<number, number[][]>; // itemId -> array min-heap of [key, seq, userId]
    private latestSeq: Map<number, number>; // (userId << 16) | itemId -> seq
    private clock: number;

    constructor() {
        this.heaps = new Map();
        this.latestSeq = new Map();
        this.clock = 0;
    }

    addBid(userId: number, itemId: number, bidAmount: number): void {
        this.push(userId, itemId, bidAmount);
    }

    updateBid(userId: number, itemId: number, newAmount: number): void {
        this.push(userId, itemId, newAmount);
    }

    removeBid(userId: number, itemId: number): void {
        this.latestSeq.delete((userId << 16) | itemId);
    }

    getHighestBidder(itemId: number): number {
        const heap = this.heaps.get(itemId);
        while (heap && heap.length > 0) {
            const [, seq, userId] = heap[0];
            if (this.latestSeq.get((userId << 16) | itemId) === seq) {
                return userId;
            }
            this.popRoot(heap);
        }
        return -1;
    }

    private push(userId: number, itemId: number, amount: number): void {
        this.clock += 1;
        this.latestSeq.set((userId << 16) | itemId, this.clock);
        const key = -(amount * 65536 + userId);
        let heap = this.heaps.get(itemId);
        if (!heap) {
            heap = [];
            this.heaps.set(itemId, heap);
        }
        heap.push([key, this.clock, userId]);
        let i = heap.length - 1;
        while (i > 0) {
            const parent = (i - 1) >> 1;
            if (heap[parent][0] <= heap[i][0]) {
                break;
            }
            [heap[parent], heap[i]] = [heap[i], heap[parent]];
            i = parent;
        }
    }

    private popRoot(heap: number[][]): void {
        const last = heap.pop();
        if (heap.length === 0) {
            return;
        }
        heap[0] = last;
        let i = 0;
        for (;;) {
            const left = 2 * i + 1;
            const right = left + 1;
            let best = i;
            if (left < heap.length && heap[left][0] < heap[best][0]) {
                best = left;
            }
            if (right < heap.length && heap[right][0] < heap[best][0]) {
                best = right;
            }
            if (best === i) {
                break;
            }
            [heap[i], heap[best]] = [heap[best], heap[i]];
            i = best;
        }
    }
}
