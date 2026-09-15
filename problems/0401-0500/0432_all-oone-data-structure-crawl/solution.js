// One bucket per count — the count plus the keys at it — threaded on a
// doubly-linked list kept in ascending count order; every inc/dec walks its
// key exactly one bucket over, splicing the neighboring count in when it is
// missing and dropping buckets that empty out, so the extremes sit at the
// list's ends.
class AllOne {
    constructor() {
        this.head = { count: 0, keys: new Set(), prev: null, next: null }; // sentinel below every real count
        this.tail = { count: 0, keys: new Set(), prev: null, next: null }; // sentinel above every real count
        this.head.next = this.tail;
        this.tail.prev = this.head;
        this.keyBucket = new Map();
    }

    insertAfter(anchor, count) {
        const bucket = { count, keys: new Set(), prev: anchor, next: anchor.next };
        anchor.next.prev = bucket;
        anchor.next = bucket;
        return bucket;
    }

    inc(key) {
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

    dec(key) {
        const old = this.keyBucket.get(key); // the statement guarantees presence
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

    getMaxKey() {
        const bucket = this.tail.prev;
        if (bucket === this.head) {
            return "";
        }
        // Several keys may share the top count; the lexicographically
        // smallest of them is the pinned answer.
        let best = null;
        for (const key of bucket.keys) {
            if (best === null || key < best) {
                best = key;
            }
        }
        return best;
    }

    getMinKey() {
        const bucket = this.head.next;
        if (bucket === this.tail) {
            return "";
        }
        // Several keys may share the bottom count; the lexicographically
        // smallest of them is the pinned answer.
        let best = null;
        for (const key of bucket.keys) {
            if (best === null || key < best) {
                best = key;
            }
        }
        return best;
    }
}
