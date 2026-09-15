class Solution {

    public int search(ArrayReader reader, int target) {
        // Exponential probe: find the smallest power-of-two index whose
        // value reaches the target (or the out-of-range sentinel, which is
        // larger than any real element).
        int hi = 1;
        while (reader.get(hi) < target) {
            hi *= 2;
        }
        // Ordinary binary search for the first index with value >= target.
        int lo = 0;
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (reader.get(mid) < target) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return reader.get(lo) == target ? lo : -1;
    }
}
