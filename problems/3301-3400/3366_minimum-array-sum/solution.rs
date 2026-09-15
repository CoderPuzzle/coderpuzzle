impl Solution {
    pub fn min_array_sum(nums: Vec<i32>, k: i32, op1: i32, op2: i32) -> i32 {
        // dp[a][b] = smallest achievable sum of the remaining suffix given
        // a op1 uses and b op2 uses left. Each index branches over: skip,
        // op1 alone, op2 alone, and both operations on the same index — in
        // either order, because halve-then-subtract and subtract-then-halve
        // land on different values (e.g. 5 with k = 3: 5 -> 3 -> 0 beats
        // 5 -> 2 -> 1). Values reach 1e5 and n is at most 100, so every
        // sum stays far inside 32 bits.
        let op1 = op1 as usize;
        let op2 = op2 as usize;
        let mut nxt = vec![vec![0i32; op2 + 1]; op1 + 1];
        for i in (0..nums.len()).rev() {
            let value = nums[i];
            let halved = (value + 1) / 2;
            let mut cur = vec![vec![0i32; op2 + 1]; op1 + 1];
            for a in 0..=op1 {
                for b in 0..=op2 {
                    let mut best = value + nxt[a][b];
                    if a > 0 {
                        best = best.min(halved + nxt[a - 1][b]);
                        if b > 0 {
                            // op2's precondition applies to the value it
                            // meets, which depends on the order chosen.
                            let both = nxt[a - 1][b - 1];
                            if halved >= k {
                                best = best.min(halved - k + both);
                            }
                            if value >= k {
                                best = best.min((value - k + 1) / 2 + both);
                            }
                        }
                    }
                    if b > 0 && value >= k {
                        best = best.min(value - k + nxt[a][b - 1]);
                    }
                    cur[a][b] = best;
                }
            }
            nxt = cur;
        }
        nxt[op1][op2]
    }
}
