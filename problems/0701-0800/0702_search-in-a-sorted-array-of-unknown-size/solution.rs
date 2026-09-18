impl Solution {
    pub fn search(reader: &mut ArrayReader, target: i32) -> i32 {
        // Exponential probe: find the smallest power-of-two index whose
        // value reaches the target (or the out-of-range sentinel, which
        // is larger than any real element).
        let mut hi: i64 = 1;
        while (reader.get(hi as i32) as i64) < target as i64 {
            hi *= 2;
        }
        // Ordinary binary search for the first index with value >= target.
        let mut lo: i64 = 0;
        while lo < hi {
            let mid = (lo + hi) / 2;
            if (reader.get(mid as i32) as i64) < target as i64 {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        if reader.get(lo as i32) == target {
            lo as i32
        } else {
            -1
        }
    }
}
