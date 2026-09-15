impl Solution {
    pub fn min_changes(nums: Vec<i32>, k: i32) -> i32 {
        // dp[x] holds the fewest changes among the residue classes handled
        // so far when the chosen class values XOR to x. Values are below
        // 2^10, so 1024 states cover every reachable XOR.
        const X: usize = 1024;
        const INF: i32 = 1 << 20;
        let mut dp = vec![INF; X];
        dp[0] = 0;
        for r in 0..k as usize {
            let mut count = vec![0i32; X];
            let mut size = 0;
            let mut i = r;
            while i < nums.len() {
                count[nums[i] as usize] += 1;
                size += 1;
                i += k as usize;
            }
            // Rewriting a whole class costs its full size and leaves its
            // value free, so every state is reachable at best; keeping a
            // value that already occurs can only improve on that.
            let mut best = INF;
            for &d in &dp {
                if d < best {
                    best = d;
                }
            }
            best += size;
            let mut nxt = vec![best; X];
            for (v, &c) in count.iter().enumerate() {
                if c == 0 {
                    continue;
                }
                let cost = size - c;
                for u in 0..X {
                    let t = dp[u] + cost;
                    let w = u ^ v;
                    if t < nxt[w] {
                        nxt[w] = t;
                    }
                }
            }
            dp = nxt;
        }
        dp[0]
    }
}
