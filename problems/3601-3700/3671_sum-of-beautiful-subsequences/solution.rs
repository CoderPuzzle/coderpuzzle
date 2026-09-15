use std::collections::HashMap;

impl Solution {
    pub fn total_beauty(nums: Vec<i32>) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let maxa = *nums.iter().max().unwrap() as usize;
        // Smallest-prime-factor sieve: factorizes every distinct value once
        // so its divisors can be expanded cheaply, and each element's index
        // lands in one bucket per divisor. Bucket g then holds, in original
        // order, every position whose value is divisible by g.
        let mut spf: Vec<usize> = (0..=maxa).collect();
        let mut i = 2usize;
        while i * i <= maxa {
            if spf[i] == i {
                let mut j = i * i;
                while j <= maxa {
                    if spf[j] == j {
                        spf[j] = i;
                    }
                    j += i;
                }
            }
            i += 1;
        }
        let mut buckets: Vec<Vec<u32>> = vec![Vec::new(); maxa + 1];
        let mut cache: HashMap<i32, Vec<u32>> = HashMap::new();
        for index in 0..nums.len() {
            let value = nums[index];
            let divisors = cache.entry(value).or_insert_with(|| {
                let mut divisors: Vec<u32> = vec![1];
                let mut rest = value;
                while rest > 1 {
                    let prime = spf[rest as usize] as i32;
                    let mut times = 0i32;
                    while rest % prime == 0 {
                        rest /= prime;
                        times += 1;
                    }
                    let seed = divisors.len();
                    let base = prime as i64;
                    let mut power = base;
                    for _ in 0..times {
                        for k in 0..seed {
                            divisors.push(((divisors[k] as i64) * power) as u32);
                        }
                        power *= base;
                    }
                }
                divisors
            });
            for &d in divisors.iter() {
                buckets[d as usize].push(index as u32);
            }
        }
        // cnt[g] counts strictly increasing subsequences whose elements are
        // all divisible by g — exactly those whose GCD is a multiple of g.
        // Walking bucket g in index order, an element contributes one plus
        // the weight already accumulated at strictly smaller scaled values,
        // which is the prefix sum a Fenwick tree keeps over value ranks.
        let mut cnt = vec![0i64; maxa + 1];
        for g in 1..=maxa {
            if buckets[g].is_empty() {
                continue;
            }
            let size = maxa / g;
            let mut fen = vec![0i64; size + 1];
            let mut total: i64 = 0;
            for &i in &buckets[g] {
                let w = (nums[i as usize] / g as i32) as usize;
                let mut acc: i64 = 0;
                let mut j = w - 1;
                while j > 0 {
                    acc += fen[j];
                    j &= j - 1;
                }
                let ways = (acc + 1) % MOD;
                let mut j = w;
                while j <= size {
                    fen[j] = (fen[j] + ways) % MOD;
                    j += j & j.wrapping_neg();
                }
                total += ways;
            }
            cnt[g] = total % MOD;
        }
        // Descending sweep converts divisible-by counts into exactly-g
        // counts: by the time g is reached, every proper multiple has been
        // finalized and can be subtracted out. Each surviving g*F[g] joins
        // the answer. The subtractions can dip below zero and Rust's %
        // keeps the sign, so f is renormalized before it is reused or banked.
        let mut answer: i64 = 0;
        let mut exact = vec![0i64; maxa + 1];
        for g in (1..=maxa).rev() {
            let mut f = cnt[g];
            let mut k = 2 * g;
            while k <= maxa {
                f -= exact[k];
                k += g;
            }
            f %= MOD;
            if f < 0 {
                f += MOD;
            }
            if f != 0 {
                answer = (answer + (g as i64) * f) % MOD;
            }
            exact[g] = f;
        }
        answer as i32
    }
}
