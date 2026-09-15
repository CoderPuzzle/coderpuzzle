impl Solution {
    pub fn single_divisor_triplet(nums: Vec<i32>) -> i64 {
        let mut freq = [0i64; 101];
        for &num in &nums {
            freq[num as usize] += 1;
        }
        let mut total: i64 = 0;
        for a in 1..=100 {
            if freq[a] == 0 {
                continue;
            }
            for b in a..=100 {
                if freq[b] == 0 {
                    continue;
                }
                // skip only when the third value would repeat `b`'s bin
                // without a hit — handled naturally below by counting
                for c in b..=100 {
                    if freq[c] == 0 {
                        continue;
                    }
                    let s = (a + b + c) as i64;
                    let hits = (s % a as i64 == 0) as i64 + (s % b as i64 == 0) as i64 + (s % c as i64 == 0) as i64;
                    if hits != 1 {
                        continue;
                    }
                    if a == b && b == c {
                        let f = freq[a];
                        total += f * (f - 1) * (f - 2);
                    } else if a == b || b == c {
                        let (twice, once) = if a == b { (a, c) } else { (b, a) };
                        let f = freq[twice];
                        total += f * (f - 1) / 2 * freq[once] * 6;
                    } else {
                        total += freq[a] * freq[b] * freq[c] * 6;
                    }
                }
            }
        }
        total
    }
}
