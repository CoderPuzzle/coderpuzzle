class Solution {
    findInMountainArray(reader, target) {
        const n = reader.length();

        // Peak: the last index still on the rising slope — get(mid - 1) <
        // get(mid) means mid has not passed the peak yet.
        let lo = 1;
        let hi = n - 2;
        while (lo < hi) {
            const mid = Math.floor((lo + hi + 1) / 2);
            if (reader.get(mid - 1) < reader.get(mid)) {
                lo = mid;
            } else {
                hi = mid - 1;
            }
        }
        const peak = lo;

        // Ascending slope: smallest index with value >= target.
        lo = 0;
        hi = peak;
        while (lo < hi) {
            const mid = Math.floor((lo + hi) / 2);
            if (reader.get(mid) < target) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        if (reader.get(lo) === target) {
            return lo;
        }

        // Descending slope: smallest index with value <= target.
        lo = peak;
        hi = n - 1;
        while (lo < hi) {
            const mid = Math.floor((lo + hi) / 2);
            if (reader.get(mid) > target) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        if (reader.get(lo) === target) {
            return lo;
        }
        return -1;
    }
}
