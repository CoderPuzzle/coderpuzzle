class Solution {
    countBlocks(nums) {
        // Walk the blocks one at a time. From a known-equal index lo,
        // gallop forward — lo+1, lo+2, lo+4, ... — until a probe misses
        // the value or the array ends; that brackets the block boundary.
        // All occurrences of a value are adjacent, so a value owns
        // exactly one block and "still this value" is a monotone
        // predicate; a binary search inside the bracket finds the
        // block's last index.
        const n = nums.size();
        let blocks = 0;
        let i = 0;
        while (i < n) {
            const value = nums.at(i);
            let lo = i;
            let step = 1;
            let hi = i + step;
            while (hi < n && nums.at(hi) === value) {
                lo = hi;
                step *= 2;
                hi = i + step;
            }
            if (hi >= n) {
                hi = n - 1;
            }
            while (lo < hi) {
                const mid = Math.floor((lo + hi + 1) / 2);
                if (nums.at(mid) === value) {
                    lo = mid;
                } else {
                    hi = mid - 1;
                }
            }
            blocks += 1;
            i = lo + 1;
        }
        return blocks;
    }
}
