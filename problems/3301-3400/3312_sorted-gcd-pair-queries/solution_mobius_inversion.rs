use std::cmp::Ordering;

impl Solution {
    pub fn gcd_values(nums: Vec<i32>, queries: Vec<i64>) -> Vec<i32> {
        let max_value = *nums.iter().max().unwrap() as usize;
        let mut freq = vec![0i64; max_value + 1];
        for &value in nums.iter() {
            freq[value as usize] += 1;
        }
        // Mobius function over [1, max_value] from a linear sieve: mu[1] = 1,
        // mu[n] = 0 once a squared prime divides n, else (-1)^omega(n).
        let mut mu = vec![0i64; max_value + 1];
        mu[1] = 1;
        let mut sieved = vec![false; max_value + 1];
        let mut primes: Vec<usize> = Vec::new();
        for i in 2..=max_value {
            if !sieved[i] {
                primes.push(i);
                mu[i] = -1;
            }
            for &prime in primes.iter() {
                if prime > max_value / i {
                    break;
                }
                sieved[i * prime] = true;
                if i % prime == 0 {
                    mu[i * prime] = 0;
                    break;
                }
                mu[i * prime] = -mu[i];
            }
        }
        // count[d]: elements divisible by d, the divisor sum of the value
        // frequencies; pairs[d] = count[d] choose 2 counts every pair whose
        // gcd is a multiple of d. Mobius inversion weighs those sums with mu
        // so the proper multiples cancel: exact[d] = sum of mu[k] * pairs[d*k].
        // Pair counts reach n * (n - 1) / 2 ~= 5 * 10^9, past i32 range.
        let mut count = vec![0i64; max_value + 1];
        for d in 1..=max_value {
            let mut total: i64 = 0;
            let mut multiple = d;
            while multiple <= max_value {
                total += freq[multiple];
                multiple += d;
            }
            count[d] = total;
        }
        let mut pairs = vec![0i64; max_value + 1];
        for d in 1..=max_value {
            pairs[d] = count[d] * (count[d] - 1) / 2;
        }
        let mut exact = vec![0i64; max_value + 1];
        for d in 1..=max_value {
            let mut total: i64 = 0;
            let mut multiple = d;
            let mut k = 1usize;
            while multiple <= max_value {
                total += mu[k] * pairs[multiple];
                multiple += d;
                k += 1;
            }
            exact[d] = total;
        }
        let mut prefix = vec![0i64; max_value + 1];
        let mut running: i64 = 0;
        for d in 1..=max_value {
            running += exact[d];
            prefix[d] = running;
        }
        // Query indices reach n * (n - 1) / 2 - 1 ~= 5 * 10^9 and arrive as
        // i64s; each answer is a gcd, at most 5 * 10^4.
        let mut answer = Vec::with_capacity(queries.len());
        for query in queries.iter() {
            let mut lo = 1usize;
            let mut hi = max_value;
            let target = query + 1;
            while lo < hi {
                let mid = (lo + hi) / 2;
                match prefix[mid].cmp(&target) {
                    Ordering::Less => lo = mid + 1,
                    _ => hi = mid,
                }
            }
            answer.push(lo as i32);
        }
        answer
    }
}
