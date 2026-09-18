class LFUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.entries = new Map(); // key -> {value, freq}
        // One frequency bucket per frequency: an insertion-ordered Map
        // whose first key is the least recently used entry there. The
        // lowest live frequency is tracked, so eviction reads the front
        // of that bucket.
        this.buckets = new Map(); // freq -> Map of keys
        this.minFreq = 0;
    }

    // A use moves the entry to the bucket one frequency up, creating
    // that bucket if it is missing.
    bump(key, entry) {
        const oldBucket = this.buckets.get(entry.freq);
        oldBucket.delete(key);
        if (oldBucket.size === 0) {
            this.buckets.delete(entry.freq);
        }
        entry.freq += 1;
        let bucket = this.buckets.get(entry.freq);
        if (!bucket) {
            bucket = new Map();
            this.buckets.set(entry.freq, bucket);
        }
        bucket.set(key, true);
        if (this.minFreq === entry.freq - 1 && !this.buckets.has(entry.freq - 1)) {
            this.minFreq = entry.freq;
        }
    }

    get(key) {
        const entry = this.entries.get(key);
        if (!entry) {
            return -1;
        }
        this.bump(key, entry);
        return entry.value;
    }

    put(key, value) {
        const entry = this.entries.get(key);
        if (entry) {
            entry.value = value;
            this.bump(key, entry);
            return;
        }
        if (this.entries.size === this.capacity) {
            // Evict the least recently used entry of the least
            // frequency bucket.
            const bucket = this.buckets.get(this.minFreq);
            const victim = bucket.keys().next().value;
            bucket.delete(victim);
            if (bucket.size === 0) {
                this.buckets.delete(this.minFreq);
            }
            this.entries.delete(victim);
        }
        this.entries.set(key, { value, freq: 1 });
        let one = this.buckets.get(1);
        if (!one) {
            one = new Map();
            this.buckets.set(1, one);
        }
        one.set(key, true);
        this.minFreq = 1;
    }
}
