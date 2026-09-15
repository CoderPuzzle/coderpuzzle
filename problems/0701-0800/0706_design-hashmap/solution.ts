// A fixed array of 1009 buckets -- 1009 is prime, so key patterns that
// repeat modulo a small number do not all pile into one bucket -- each
// holding a small list of [key, value] pairs. A key's remainder picks its
// bucket, and put, get and remove each scan that bucket alone: put replaces
// the value of an existing pair in place (never a duplicate), get returns
// the stored value or -1, and remove deletes the pair when present.
const BUCKET_COUNT = 1009;

type Pair = [number, number];

class MyHashMap {
    private buckets: Pair[][] = Array.from({ length: BUCKET_COUNT }, () => []);

    constructor() {}

    put(key: number, value: number): void {
        const bucket = this.buckets[key % BUCKET_COUNT];
        for (const pair of bucket) {
            if (pair[0] === key) {
                pair[1] = value;
                return;
            }
        }
        bucket.push([key, value]);
    }

    get(key: number): number {
        for (const [stored, value] of this.buckets[key % BUCKET_COUNT]) {
            if (stored === key) {
                return value;
            }
        }
        return -1;
    }

    remove(key: number): void {
        const bucket = this.buckets[key % BUCKET_COUNT];
        for (let index = 0; index < bucket.length; ++index) {
            if (bucket[index][0] === key) {
                bucket.splice(index, 1);
                return;
            }
        }
    }
}
