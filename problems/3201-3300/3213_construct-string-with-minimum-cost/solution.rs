use std::collections::{HashMap, HashSet};

// Reverse DP over suffixes: dp[i] is the minimum cost to assemble
// target[i:], dp[n] is 0, and each position extends every word that
// matches its next characters. Duplicate words collapse to their
// cheapest cost first; per position only DISTINCT word lengths matter,
// and their count never exceeds sqrt(2 * total word characters).
// Walking candidate lengths ascending lets one wrapping u64 polynomial
// hash of target[i:i+length) extend in O(1) per step; a hash hit only
// triggers an exact map probe, so correctness never rests on the hash —
// a collision merely wastes one probe. Costs accumulate in i64 room
// (the answer itself fits an i32).
impl Solution {
    pub fn minimum_cost(target: String, words: Vec<String>, costs: Vec<i32>) -> i32 {
        let mut best: HashMap<String, i64> = HashMap::new();
        for (word, cost) in words.iter().zip(costs.iter()) {
            match best.get_mut(word) {
                Some(prev) => {
                    let c = *cost as i64;
                    if c < *prev {
                        *prev = c;
                    }
                }
                None => {
                    best.insert(word.clone(), *cost as i64);
                }
            }
        }
        let n = target.len();
        let mut buckets: HashMap<usize, HashSet<u64>> = HashMap::new();
        let mut max_len = 0usize;
        for word in best.keys() {
            let mut h: u64 = 0;
            for &b in word.as_bytes() {
                h = h.wrapping_mul(131).wrapping_add(b as u64);
            }
            buckets.entry(word.len()).or_insert_with(HashSet::new).insert(h);
            max_len = max_len.max(word.len());
        }
        const BIG: i64 = 1i64 << 62;
        let mut dp = vec![BIG; n + 1];
        dp[n] = 0;
        for i in (0..n).rev() {
            let mut cur = BIG;
            let mut h: u64 = 0;
            let limit = max_len.min(n - i);
            for length in 1..=limit {
                h = h
                    .wrapping_mul(131)
                    .wrapping_add(target.as_bytes()[i + length - 1] as u64);
                if let Some(bucket) = buckets.get(&length) {
                    if bucket.contains(&h) {
                        if let Some(&c) = best.get(&target[i..i + length]) {
                            let nxt = dp[i + length];
                            if nxt != BIG && nxt + c < cur {
                                cur = nxt + c;
                            }
                        }
                    }
                }
            }
            dp[i] = cur;
        }
        if dp[0] >= BIG {
            -1
        } else {
            dp[0] as i32
        }
    }
}
