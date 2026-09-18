class Router {
    private limit: number;
    // three parallel views of the stored packets: FIFO order (with a head
    // index so departures never shift the array), duplicate detection, and
    // an append-only timestamp log per destination
    private queue: [number, number, number][] = [];
    private head = 0;
    private stored: Set<string> = new Set();
    private timestamps: Map<number, number[]> = new Map();
    private heads: Map<number, number> = new Map();

    constructor(capacity: number) {
        this.limit = capacity;
    }

    private static key(source: number, destination: number, timestamp: number): string {
        return source + "," + destination + "," + timestamp;
    }

    addPacket(source: number, destination: number, timestamp: number): boolean {
        if (this.stored.has(Router.key(source, destination, timestamp))) {
            return false;
        }
        if (this.queue.length - this.head === this.limit) {
            // the oldest packet leaves all three views; its log entry is only
            // abandoned past the head, never shifted out of the list
            const old = this.queue[this.head++];
            this.stored.delete(Router.key(old[0], old[1], old[2]));
            this.heads.set(old[1], (this.heads.get(old[1]) || 0) + 1);
        }
        this.queue.push([source, destination, timestamp]);
        this.stored.add(Router.key(source, destination, timestamp));
        if (!this.timestamps.has(destination)) {
            this.timestamps.set(destination, []);
            this.heads.set(destination, 0);
        }
        this.timestamps.get(destination)!.push(timestamp);
        return true;
    }

    forwardPacket(): number[] {
        if (this.queue.length - this.head === 0) {
            return [];
        }
        // forwarding hands over the oldest packet and drops it from every view
        const oldest = this.queue[this.head++];
        this.stored.delete(Router.key(oldest[0], oldest[1], oldest[2]));
        this.heads.set(oldest[1], (this.heads.get(oldest[1]) || 0) + 1);
        return [oldest[0], oldest[1], oldest[2]];
    }

    getCount(destination: number, startTime: number, endTime: number): number {
        const times = this.timestamps.get(destination);
        if (times === undefined) {
            return 0;
        }
        // adds arrive with non-decreasing timestamps, so each log is sorted
        // for free and the live entries are the suffix [head, length)
        const head = this.heads.get(destination) || 0;
        let low = head;
        let high = times.length;
        while (low < high) {
            const middle = (low + high) >>> 1;
            if (times[middle] < startTime) {
                low = middle + 1;
            } else {
                high = middle;
            }
        }
        const first = low;
        low = head;
        high = times.length;
        while (low < high) {
            const middle = (low + high) >>> 1;
            if (times[middle] <= endTime) {
                low = middle + 1;
            } else {
                high = middle;
            }
        }
        return low - first;
    }
}
