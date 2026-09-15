impl Solution {
    // Elements fit in i32, and every table value, candidate, and the
    // answer stay within 2 * 10^5, so i32 arithmetic carries everything
    // here. inc/dec: longest alternating subarray ending at i, last
    // comparison < / >; rinc/rdec: the same starting at j, by first
    // comparison.
    pub fn longest_alternating(nums: Vec<i32>) -> i32 {
        let n = nums.len();
        let mut inc = vec![1i32; n];
        let mut dec = vec![1i32; n];
        for i in 1..n {
            if nums[i - 1] < nums[i] {
                inc[i] = dec[i - 1] + 1;
            } else if nums[i - 1] > nums[i] {
                dec[i] = inc[i - 1] + 1;
            }
        }
        let mut rinc = vec![1i32; n];
        let mut rdec = vec![1i32; n];
        for j in (0..n.saturating_sub(1)).rev() {
            if nums[j] < nums[j + 1] {
                rinc[j] = rdec[j + 1] + 1;
            } else if nums[j] > nums[j + 1] {
                rdec[j] = rinc[j + 1] + 1;
            }
        }
        let mut best = 1i32;
        for i in 0..n {
            if inc[i] > best {
                best = inc[i];
            }
            if dec[i] > best {
                best = dec[i];
            }
        }
        // Removing nums[r] only helps when the subarray spans it: the
        // bridge comparison nums[r-1] vs nums[r+1] must alternate with
        // both edge comparisons; equal neighbours bridge nothing.
        for r in 1..n.saturating_sub(1) {
            let cand;
            if nums[r - 1] < nums[r + 1] {
                cand = dec[r - 1] + rdec[r + 1];
            } else if nums[r - 1] > nums[r + 1] {
                cand = inc[r - 1] + rinc[r + 1];
            } else {
                continue;
            }
            if cand > best {
                best = cand;
            }
        }
        best
    }
}
