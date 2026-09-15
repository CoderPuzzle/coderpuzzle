// One bucket per count — the count plus the keys at it — threaded on a
// doubly-linked list kept in ascending count order; every inc/dec walks its
// key exactly one bucket over, splicing the neighboring count in when it is
// missing and dropping buckets that empty out, so the extremes sit at the
// list's ends.
class Bucket {
    count: number;
    keys: Set<string>;
    prev: Bucket;
    next: Bucket;

    constructor(count: number) {
        this.count = count;
        this.keys = new Set<string>();
        this.prev = this; // temporarily self-linked; splicing rewires both ways
        this.next = this;
    }
}

class AllOne {
    private head: Bucket; // sentinel below every real count
    private tail: Bucket; // sentinel above every real count
    private keyBucket: Map<string, Bucket>;

    constructor() {
        this.head = new Bucket(0);
        this.tail = new Bucket(0);
        this.head.next = this.tail;
        this.tail.prev = this.head;
        this.keyBucket = new Map();
    }

    private insertAfter(anchor: Bucket, count: number): Bucket {
        const bucket = new Bucket(count);
        bucket.prev = anchor;
        bucket.next = anchor.next;
        anchor.next.prev = bucket;
        anchor.next = bucket;
        return bucket;
    }

    inc(key: string): void {
        const old = this.keyBucket.get(key);
        const anchor = old === undefined ? this.head : old;
        const count = old === undefined ? 1 : old.count + 1;
        // The needed count is exactly one past the anchor's, so only its
        // immediate successor can already hold it.
        let bucket = anchor.next;
        if (bucket.count !== count) {
            bucket = this.insertAfter(anchor, count);
        }
        bucket.keys.add(key);
        this.keyBucket.set(key, bucket);
        if (old !== undefined) {
            old.keys.delete(key);
            if (old.keys.size === 0) {
                old.prev.next = old.next;
                old.next.prev = old.prev;
            }
        }
    }

    dec(key: string): void {
        const old = this.keyBucket.get(key) as Bucket; // the statement guarantees presence
        this.keyBucket.delete(key);
        if (old.count > 1) {
            const count = old.count - 1;
            let bucket = old.prev;
            if (bucket.count !== count) {
                bucket = this.insertAfter(old.prev, count);
            }
            bucket.keys.add(key);
            this.keyBucket.set(key, bucket);
        }
        old.keys.delete(key);
        if (old.keys.size === 0) {
            old.prev.next = old.next;
            old.next.prev = old.prev;
        }
    }

    getMaxKey(): string {
        const bucket = this.tail.prev;
        if (bucket === this.head) {
            return "";
        }
        // Several keys may share the top count; the lexicographically
        // smallest of them is the pinned answer.
        let best: string | null = null;
        for (const key of bucket.keys) {
            if (best === null || key < best) {
                best = key;
            }
        }
        return best as string;
    }

    getMinKey(): string {
        const bucket = this.head.next;
        if (bucket === this.tail) {
            return "";
        }
        // Several keys may share the bottom count; the lexicographically
        // smallest of them is the pinned answer.
        let best: string | null = null;
        for (const key of bucket.keys) {
            if (best === null || key < best) {
                best = key;
            }
        }
        return best as string;
    }
}
