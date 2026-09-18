impl Solution {
    pub fn findInMountainArray(reader: &mut MountainArray, target: i32) -> i32 {
        let n = reader.length();

        // Peak: the last index still on the rising slope — get(mid - 1) <
        // get(mid) means mid has not passed the peak yet.
        let (mut lo, mut hi) = (1, n - 2);
        while lo < hi {
            let mid = (lo + hi + 1) / 2;
            if reader.get(mid - 1) < reader.get(mid) {
                lo = mid;
            } else {
                hi = mid - 1;
            }
        }
        let peak = lo;

        // Ascending slope: smallest index with value >= target.
        (lo, hi) = (0, peak);
        while lo < hi {
            let mid = (lo + hi) / 2;
            if reader.get(mid) < target {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        if reader.get(lo) == target {
            return lo;
        }

        // Descending slope: smallest index with value <= target.
        (lo, hi) = (peak, n - 1);
        while lo < hi {
            let mid = (lo + hi) / 2;
            if reader.get(mid) > target {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        if reader.get(lo) == target {
            return lo;
        }
        -1
    }
}
