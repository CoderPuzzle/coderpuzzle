use std::collections::HashMap;

impl Solution {
    pub fn substring_xor_queries(s: String, queries: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        // first ^ second <= 2^30 - 1 (both fit under 10^9), so only
        // substrings of at most 30 characters can ever match a query.
        // Sweeping lengths ascending records each decoded value the first
        // time it is seen, which is exactly the statement's pick: shortest
        // length, ties broken by the leftmost start. A 30-bit window stays
        // < 2^30, safely inside i32.
        let bytes = s.as_bytes();
        let n = bytes.len();
        let mut best: HashMap<i32, [i32; 2]> = HashMap::new();
        for length in 1..=30.min(n) {
            for left in 0..=(n - length) {
                if bytes[left] == b'0' && length > 1 {
                    // "0xxx" decodes to xxx's value, which the previous,
                    // shorter pass already handled.
                    continue;
                }
                let mut val: i32 = 0;
                for k in left..left + length {
                    val = val * 2 + (bytes[k] - b'0') as i32;
                }
                best.entry(val).or_insert([left as i32, (left + length - 1) as i32]);
            }
        }
        queries
            .iter()
            .map(|q| {
                let target = q[0] ^ q[1];
                best.get(&target)
                    .map(|&pair| pair.to_vec())
                    .unwrap_or_else(|| vec![-1, -1])
            })
            .collect()
    }
}
