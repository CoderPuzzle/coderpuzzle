use std::collections::HashMap;

impl Solution {
    pub fn xor_after_queries(nums: Vec<i32>, queries: Vec<Vec<i32>>) -> i32 {
        const MOD: i64 = 1_000_000_007;
        fn power(base: i64) -> i64 {
            let mut result = 1i64;
            let mut exp = MOD - 2;
            let mut base = base;
            while exp > 0 {
                if exp & 1 == 1 {
                    result = result * base % MOD;
                }
                base = base * base % MOD;
                exp >>= 1;
            }
            result
        }
        let n = nums.len();
        let mut b = 1i64;
        while (b + 1) * (b + 1) <= n as i64 {
            b += 1;
        }
        let bb = b + 1;
        // Strides above the threshold visit fewer than sqrt(n) + 1 positions
        // each and are applied literally; strides at or below it share
        // residue-class buckets, each applied in one prefix-product sweep.
        let mut nums = nums;
        let mut buckets: HashMap<i64, Vec<(usize, i64)>> = HashMap::new();
        for query in &queries {
            let (l, r, k, v) = (query[0] as i64, query[1] as i64, query[2] as i64, query[3] as i64);
            if k > b {
                let mut idx = l as usize;
                while idx <= r as usize {
                    nums[idx] = (nums[idx] as i64 * v % MOD) as i32;
                    idx += k as usize;
                }
            } else {
                let c = l % k;
                let key = k * (b + 1) + c;
                // Coordinate events: the multiplier starts at l's coordinate
                // and stops just past the last visited coordinate.
                let events = buckets.entry(key).or_default();
                events.push(((l / k) as usize, v));
                events.push((((r - c) / k + 1) as usize, power(v)));
            }
        }
        for (key, events) in buckets.iter_mut() {
            let k = (key / bb) as usize;
            let c = (key % bb) as usize;
            events.sort_by_key(|event| event.0);
            let span = (n - 1 - c) / k + 1;
            let mut acc = 1i64;
            let mut prev = 0usize;
            let mut i = 0usize;
            while i < events.len() {
                let pos = events[i].0;
                if acc != 1 {
                    for p in prev..pos {
                        let slot = &mut nums[c + p * k];
                        *slot = (*slot as i64 * acc % MOD) as i32;
                    }
                }
                let mut d = 1i64;
                while i < events.len() && events[i].0 == pos {
                    d = d * events[i].1 % MOD;
                    i += 1;
                }
                acc = acc * d % MOD;
                prev = pos;
            }
            if acc != 1 {
                for p in prev..span {
                    let slot = &mut nums[c + p * k];
                    *slot = (*slot as i64 * acc % MOD) as i32;
                }
            }
        }
        nums.into_iter().fold(0, |x, value| x ^ value)
    }
}
