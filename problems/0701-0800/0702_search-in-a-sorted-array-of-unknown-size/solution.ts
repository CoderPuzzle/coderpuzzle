class Solution {
    search(reader: ArrayReader, target: number): number {
        // Exponential probe: find the smallest power-of-two index whose
        // value reaches the target (or the out-of-range sentinel, which
        // is larger than any real element).
        let hi = 1;
        while (reader.get(hi) < target) {
            hi *= 2;
        }
        // Ordinary binary search for the first index with value >= target.
        let lo = 0;
        while (lo < hi) {
            const mid = Math.floor((lo + hi) / 2);
            if (reader.get(mid) < target) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return reader.get(lo) === target ? lo : -1;
    }
}
