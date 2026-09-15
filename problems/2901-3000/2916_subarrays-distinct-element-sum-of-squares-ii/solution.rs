impl Solution {
    pub fn sum_counts(nums: Vec<i32>) -> i32 {
        // Fenwick pair over the per-start distinct counts d[j] of the windows
        // ending at the current index: range-add and range-sum of exact
        // counts. Range sums reach n(n+1)/2 ~ 5*10^9, past 32 bits, so every
        // accumulator stays in i64.
        const MOD: i64 = 1_000_000_007;
        let n = nums.len();
        let mut b1 = vec![0i64; n + 2];
        let mut b2 = vec![0i64; n + 2];
        let mut last = vec![-1i64; 100001];
        let mut answer: i64 = 0;
        let mut running: i64 = 0;
        for i in 0..n {
            let lo = (last[nums[i] as usize] + 2) as usize;
            // Windows opened in (last, i-1] each gain one distinct value, so
            // their squares grow by 2*d + 1; the fresh window contributes
            // 1^2. T is the exact pre-increment sum over the gaining range.
            let t = if lo <= i {
                Self::prefix(&b1, &b2, i) - Self::prefix(&b1, &b2, lo - 1)
            } else {
                0
            };
            running = (running + 2 * t + (i as i64 - lo as i64 + 2)) % MOD;
            answer = (answer + running) % MOD;
            if lo <= i {
                Self::add(&mut b1, &mut b2, n, lo, i, 1);
            }
            Self::add(&mut b1, &mut b2, n, i + 1, i + 1, 1);
            last[nums[i] as usize] = i as i64;
        }
        answer as i32
    }

    fn add(b1: &mut [i64], b2: &mut [i64], n: usize, l: usize, r: usize, v: i64) {
        let mut x = l;
        while x <= n + 1 {
            b1[x] += v;
            b2[x] += v * (l as i64 - 1);
            x += x & x.wrapping_neg();
        }
        let mut x = r + 1;
        while x <= n + 1 {
            b1[x] -= v;
            b2[x] -= v * r as i64;
            x += x & x.wrapping_neg();
        }
    }

    fn prefix(b1: &[i64], b2: &[i64], x: usize) -> i64 {
        let x0 = x;
        let mut s1: i64 = 0;
        let mut s2: i64 = 0;
        let mut x = x;
        while x > 0 {
            s1 += b1[x];
            s2 += b2[x];
            x -= x & x.wrapping_neg();
        }
        s1 * x0 as i64 - s2
    }
}
