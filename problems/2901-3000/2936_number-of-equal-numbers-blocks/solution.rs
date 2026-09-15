impl Solution {
    // Walk the blocks one at a time. From a known-equal index lo,
    // gallop forward — lo+1, lo+2, lo+4, ... — until a probe misses the
    // value or the array ends; that brackets the block boundary. All
    // occurrences of a value are adjacent, so a value owns exactly one
    // block and "still this value" is a monotone predicate; a binary
    // search inside the bracket finds the block's last index. Positions
    // are 64-bit; only the block count is returned, and that provably
    // fits in 32 bits.
    pub fn count_blocks(nums: &mut BigArray) -> i32 {
        let n = nums.size();
        let mut blocks: i32 = 0;
        let mut i: i64 = 0;
        while i < n {
            let value = nums.at(i);
            let mut lo = i;
            let mut step: i64 = 1;
            let mut hi = i + step;
            while hi < n && nums.at(hi) == value {
                lo = hi;
                step *= 2;
                hi = i + step;
            }
            if hi >= n {
                hi = n - 1;
            }
            while lo < hi {
                let mid = lo + (hi - lo + 1) / 2;
                if nums.at(mid) == value {
                    lo = mid;
                } else {
                    hi = mid - 1;
                }
            }
            blocks += 1;
            i = lo + 1;
        }
        blocks
    }
}
