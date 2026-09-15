// Which tops are reachable in exactly k moves is pure move-budget casework;
// each branch is answered without simulating k moves.
impl Solution {
    pub fn maximum_top(nums: Vec<i32>, k: i32) -> i32 {
        let n = nums.len();
        let k = k as usize;
        if k == 0 {
            return nums[0];
        }
        if n == 1 {
            // The lone element alternates removed/back, so odd k empties it.
            return if k % 2 == 0 { nums[0] } else { -1 };
        }
        if k == 1 {
            // No removed elements exist yet, so the single move is a pop.
            return nums[1];
        }
        if k > n {
            // Remove everything, burn all but the last move in pop/push
            // pairs, then push the maximum back on.
            return *nums.iter().max().unwrap();
        }
        // 2 <= k <= n: either k pure removals expose nums[k], or removals
        // plus one push-back land any nums[i] with i <= k-2 on top.
        let mut best = if k < n { nums[k] } else { -1 };
        for i in 0..k - 1 {
            if nums[i] > best {
                best = nums[i];
            }
        }
        best
    }
}
