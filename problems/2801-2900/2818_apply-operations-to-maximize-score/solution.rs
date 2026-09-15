impl Solution {
    pub fn maximum_score(nums: Vec<i32>, k: i32) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let n = nums.len();
        let maxv = *nums.iter().max().unwrap() as usize;

        // Smallest-prime-factor sieve: lets each value's distinct prime
        // count be read off by repeated division, no trial division.
        let mut spf: Vec<usize> = (0..=maxv).collect();
        let mut i = 2usize;
        while i * i <= maxv {
            if spf[i] == i {
                let mut j = i * i;
                while j <= maxv {
                    if spf[j] == j {
                        spf[j] = i;
                    }
                    j += i;
                }
            }
            i += 1;
        }

        // Prime score = number of distinct prime factors; dividing out
        // each prime fully counts it exactly once.
        let mut scores = vec![0i32; n];
        for idx in 0..n {
            let mut v = nums[idx] as usize;
            let mut cnt = 0i32;
            let mut lastp = 0usize;
            let mut first = true;
            while v > 1 {
                let p = spf[v];
                if first || p != lastp {
                    cnt += 1;
                    lastp = p;
                    first = false;
                }
                while v % p == 0 {
                    v /= p;
                }
            }
            scores[idx] = cnt;
        }

        // left[i]: nearest index left of i with prime score >= score[i];
        // right[i]: nearest index right of i with score strictly greater.
        // The >= / > asymmetry gives tied subarrays to the smallest index,
        // so every subarray is attributed to exactly one element.
        let mut left = vec![-1i64; n];
        let mut stack: Vec<usize> = Vec::new();
        for idx in 0..n {
            while let Some(&top) = stack.last() {
                if scores[top] < scores[idx] {
                    stack.pop();
                } else {
                    break;
                }
            }
            left[idx] = stack.last().map(|&v| v as i64).unwrap_or(-1);
            stack.push(idx);
        }

        let mut right = vec![n as i64; n];
        stack.clear();
        for idx in (0..n).rev() {
            while let Some(&top) = stack.last() {
                if scores[top] <= scores[idx] {
                    stack.pop();
                } else {
                    break;
                }
            }
            right[idx] = stack.last().map(|&v| v as i64).unwrap_or(n as i64);
            stack.push(idx);
        }

        // Greedy: take the largest value first; element i wins exactly
        // (i - left[i]) * (right[i] - i) subarrays, bounding its picks.
        let mut idx_order: Vec<usize> = (0..n).collect();
        idx_order.sort_by(|&a, &b| nums[b].cmp(&nums[a]));

        let mut score: i64 = 1;
        let mut rem: i64 = k as i64;
        for &i in &idx_order {
            // Cap picks at the winning-subarray count and the remaining
            // budget; one fast exponentiation covers any multiplicity.
            let cnt = (i as i64 - left[i]) * (right[i] - i as i64);
            let use_ = cnt.min(rem);
            if use_ > 0 {
                score = score * modpow(nums[i] as i64, use_, MOD) % MOD;
                rem -= use_;
            }
            if rem == 0 {
                break;
            }
        }
        score as i32
    }
}

fn modpow(mut b: i64, mut e: i64, m: i64) -> i64 {
    let mut r: i64 = 1 % m;
    b %= m;
    while e > 0 {
        if e & 1 == 1 {
            r = r * b % m;
        }
        b = b * b % m;
        e >>= 1;
    }
    r
}
