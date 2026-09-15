use std::collections::HashSet;

impl Solution {
    pub fn count_good_integers(n: i32, k: i32) -> i64 {
        let n = n as usize;
        let k = k as i64;
        let half = (n + 1) / 2;
        let mut fact = vec![1i64; n + 1];
        for i in 1..=n {
            fact[i] = fact[i - 1] * i as i64;
        }
        let mut seen: HashSet<[u8; 10]> = HashSet::new();
        let limit = 10usize.pow(half as u32);
        for first in 0..limit {
            let mut prefix = vec![0u8; half];
            let mut v = first;
            for i in 0..half {
                prefix[i] = (v % 10) as u8;
                v /= 10;
            }
            if prefix[half - 1] == 0 {
                continue;
            }
            let mut seq: Vec<u8> = Vec::with_capacity(n);
            for i in (0..half).rev() {
                seq.push(prefix[i]);
            }
            if n % 2 == 0 {
                for i in 0..half {
                    seq.push(prefix[i]);
                }
            } else {
                for i in 1..half {
                    seq.push(prefix[i]);
                }
            }
            let mut counts = [0u8; 10];
            let mut value: i64 = 0;
            for &d in &seq {
                counts[d as usize] += 1;
                value = (value * 10 + d as i64) % k;
            }
            if value == 0 {
                seen.insert(counts);
            }
        }
        let mut answer: i64 = 0;
        for counts in &seen {
            let mut total = fact[n];
            for &c in counts.iter() {
                total /= fact[c as usize];
            }
            if counts[0] > 0 {
                let mut lead = fact[n - 1];
                lead /= fact[(counts[0] - 1) as usize];
                for d in 1..10 {
                    lead /= fact[counts[d] as usize];
                }
                total -= lead;
            }
            answer += total;
        }
        answer
    }
}
