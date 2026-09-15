impl Solution {
    pub fn max_profit(n: i32, edges: Vec<Vec<i32>>, score: Vec<i32>) -> i32 {
        let n = n as usize;
        let mut pred = vec![0u32; n];
        for e in &edges {
            pred[e[1] as usize] |= 1u32 << e[0] as usize;
        }

        let full: u32 = (1u32 << n) - 1;
        let mut dp = vec![-1i32; 1usize << n];
        dp[0] = 0;

        for mask in 0u32..=full {
            let cur = dp[mask as usize];
            if cur < 0 {
                continue;
            }
            let pos = mask.count_ones() + 1;
            let mut remaining = full ^ mask;
            while remaining != 0 {
                let bit = remaining & remaining.wrapping_neg();
                let node = bit.trailing_zeros() as usize;
                if pred[node] & mask == pred[node] {
                    let nm = (mask | bit) as usize;
                    let val = cur + score[node] * pos as i32;
                    if val > dp[nm] {
                        dp[nm] = val;
                    }
                }
                remaining -= bit;
            }
        }
        dp[full as usize]
    }
}
