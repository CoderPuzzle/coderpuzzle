// A fixed array of 769 buckets: key % 769 selects the bucket, and the
// bucket's short list holds exactly the keys that hashed there. add()
// appends only when the key is absent, remove() deletes only when the key
// is present, and contains() scans the one bucket. 769 is prime, so
// repetitive key patterns spread out instead of piling onto one bucket.
const BUCKETS = 769;

class MyHashSet {
    private buckets: number[][] = Array.from({ length: BUCKETS }, () => []);

    constructor() {}

    add(key: number): void {
        const bucket = this.buckets[key % BUCKETS];
        if (!bucket.includes(key)) {
            bucket.push(key);
        }
    }

    remove(key: number): void {
        const bucket = this.buckets[key % BUCKETS];
        const position = bucket.indexOf(key);
        if (position !== -1) {
            bucket.splice(position, 1);
        }
    }

    contains(key: number): boolean {
        return this.buckets[key % BUCKETS].includes(key);
    }
}
