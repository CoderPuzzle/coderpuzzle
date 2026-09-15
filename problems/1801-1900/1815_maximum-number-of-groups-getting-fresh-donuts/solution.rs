use std::collections::HashMap;

impl Solution {
    // A group is happy when the donut count before it is 0 mod batchSize,
    // so the ordering matters only through remainders. Remainder-0 groups
    // are always happy, complementary remainders pair into zero-sum
    // blocks, and the memoized DP places what is left. Each remainder
    // class count fits 5 bits (n <= 30), so a packed state key fits
    // comfortably in a u64.
    pub fn max_happy_groups(batch_size: i32, groups: Vec<i32>) -> i32 {
        let k = batch_size as usize;
        let mut freq = vec![0i64; k];
        for &g in &groups {
            freq[(g as i64 % k as i64) as usize] += 1;
        }
        let mut ans = freq[0];
        freq[0] = 0;
        let (mut i, mut j) = (1, k - 1);
        while i < j {
            let m = freq[i].min(freq[j]);
            ans += m;
            freq[i] -= m;
            freq[j] -= m;
            i += 1;
            j -= 1;
        }
        if k % 2 == 0 {
            let h = k / 2;
            ans += freq[h] / 2;
            freq[h] %= 2;
        }
        let mut state: u64 = 0;
        for c in 1..k {
            state |= (freq[c] as u64) << (5 * (c - 1));
        }
        let mut memo: HashMap<u64, i32> = HashMap::new();
        ans as i32 + Solution::dp(&mut memo, state, 0, k)
    }

    fn dp(memo: &mut HashMap<u64, i32>, state: u64, r: usize, k: usize) -> i32 {
        if state == 0 {
            return 0;
        }
        let key = (state << 4) | r as u64;
        if let Some(&cached) = memo.get(&key) {
            return cached;
        }
        let mut best = 0;
        for c in 1..k {
            let count = (state >> (5 * (c - 1))) & 31;
            if count > 0 {
                let gain = if r == 0 { 1 } else { 0 };
                let cand = gain + Solution::dp(memo, state - (1u64 << (5 * (c - 1))), (r + c) % k, k);
                if cand > best {
                    best = cand;
                }
            }
        }
        memo.insert(key, best);
        best
    }
}
