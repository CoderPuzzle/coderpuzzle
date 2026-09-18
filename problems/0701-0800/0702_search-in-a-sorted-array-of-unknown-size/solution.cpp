class ArrayReader;

class Solution {
  public:
    int search(ArrayReader &reader, int target) {
        // Exponential probe: find the smallest power-of-two index whose
        // value reaches the target (or the out-of-range sentinel, which is
        // larger than any real element).
        long long hi = 1;
        while (reader.get(static_cast<int>(hi)) < target) {
            hi *= 2;
        }
        // Ordinary binary search for the first index with value >= target.
        long long lo = 0;
        while (lo < hi) {
            long long mid = (lo + hi) / 2;
            if (reader.get(static_cast<int>(mid)) < target) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return reader.get(static_cast<int>(lo)) == target ? static_cast<int>(lo) : -1;
    }
};
