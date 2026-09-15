use std::collections::HashMap;

impl Solution {
    // A good meal needs two values summing to a power of two. Values are
    // capped at 2^20, so a sum never exceeds 2^21: exactly the 22 powers
    // 2^0 .. 2^21 are possible targets and nothing else. Counting how
    // often each value occurs settles every pair at once. For a distinct
    // value v and a power p, the mate w = p - v contributes
    // count(v) * count(w) pairs when w > v, while w == v (p equal to 2v
    // exactly) contributes count(v) choose 2: the pairs of equal-valued
    // items at different indices. The raw total reaches n * (n - 1) / 2,
    // past 32 bits, so it accumulates in an i64 and reduces mod 10^9 + 7
    // at the end.
    pub fn count_pairs(deliciousness: Vec<i32>) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let mut count: HashMap<i32, i32> = HashMap::new();
        for &value in &deliciousness {
            *count.entry(value).or_insert(0) += 1;
        }
        let mut total: i64 = 0;
        for (&value, &c) in &count {
            let mut power: i64 = 1;
            while power <= 1 << 21 {
                let mate = power - value as i64;
                if mate > value as i64 {
                    let cm = count.get(&(mate as i32)).copied().unwrap_or(0);
                    total += c as i64 * cm as i64;
                } else if mate == value as i64 {
                    total += c as i64 * (c - 1) as i64 / 2;
                }
                power <<= 1;
            }
        }
        (total % MOD) as i32
    }
}
