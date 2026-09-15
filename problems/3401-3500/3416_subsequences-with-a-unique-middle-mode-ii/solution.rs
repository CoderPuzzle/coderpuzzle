use std::collections::HashMap;

const MOD: i64 = 1_000_000_007;

fn c2(x: i64) -> i64 {
    if x >= 2 {
        x * (x - 1) / 2
    } else {
        0
    }
}

fn cm(a: i64, b: i64) -> i64 {
    a % MOD * (b % MOD) % MOD
}

fn norm(x: i64) -> i64 {
    let m = x % MOD;
    if m < 0 {
        m + MOD
    } else {
        m
    }
}

impl Solution {
    pub fn subsequences_with_middle_mode(nums: Vec<i32>) -> i32 {
        let n = nums.len();
        let mut total: HashMap<i32, i64> = HashMap::new();
        for &x in &nums {
            *total.entry(x).or_insert(0) += 1;
        }
        // Exact power-sum aggregates over left-side counts lw, kept as
        // true i64 values (bounded by n^3 <= 1e15) so every division by 2
        // below happens on a genuine integer.
        let mut left: HashMap<i32, i64> = HashMap::new();
        let mut s1 = 0i64; // sum lw
        let mut s2 = 0i64; // sum lw^2
        let mut s3 = 0i64; // sum lw^3
        let mut t1 = 0i64; // sum lw*cnt
        let mut t2 = 0i64; // sum lw*cnt^2
        let mut t3 = 0i64; // sum lw^2*cnt
        let sc2: i64 = total.values().map(|&c| c * c).sum();

        let mut answer: i64 = 0;
        for (i, &v) in nums.iter().enumerate() {
            let cntv = total[&v];
            let l = *left.get(&v).unwrap_or(&0);
            let r = cntv - l - 1; // the middle occurrence is on neither side
            let nl = i as i64 - l; // non-v elements left of i
            let nr = (n as i64 - 1 - i as i64) - r; // non-v elements right of i

            // Per-value sums over w != v, rebuilt from the aggregates. For
            // v itself the moment value cnt - l still contains the middle
            // element, so its exclusion squares (r + 1).
            let sum_lw2 = s2 - l * l;
            let sum_lw = s1 - l;
            let sum_rw2 = sc2 - 2 * t1 + s2 - (r + 1) * (r + 1);
            let sum_rw = n as i64 - 1 - i as i64 - r;
            let sum_lw_rw = (t1 - l * cntv) - sum_lw2;
            let sum_lw_rw2 = (t2 - l * cntv * cntv) - 2 * (t3 - l * l * cntv) + (s3 - l * l * l);
            let sum_lw2_rw = (t3 - l * l * cntv) - (s3 - l * l * l);
            let sum_c2rw = (sum_rw2 - sum_rw) / 2;
            let sum_c2lw = (sum_lw2 - sum_lw) / 2;
            // sum_w lw*rw*(NR - rw) and sum_w rw*lw*(NL - lw)
            let d10 = nr * sum_lw_rw - sum_lw_rw2;
            let d01 = nl * sum_lw_rw - sum_lw2_rw;

            // Count by f, the frequency of v inside the subsequence. With
            // f >= 3 no other value can catch up, so only f = 2 needs the
            // inclusion-exclusion on the three non-v fills.
            let c2l = c2(l);
            let c2r = c2(r);
            let mut val = cm(c2l, c2r); // f = 5
            val += (cm(l, c2r) * nl + cm(c2l, r) * nr) % MOD; // f = 4
            val += cm(c2r, c2(nl)) + cm(cm(l, r), nl * nr) + cm(c2l, c2(nr)); // f = 3
                                                                              // f = 2: one more v on the left (or right), the three non-v
                                                                              // fills pairwise distinct.
            let g10 = norm(nl * c2(nr) - nl * sum_c2rw - d10);
            val += l * g10 % MOD;
            let g01 = norm(c2(nl) * nr - nr * sum_c2lw - d01);
            val += r * g01 % MOD;

            answer = (answer + val) % MOD;

            // nums[i] joins the left side for every later middle.
            let old = l;
            s1 += 1;
            s2 += 2 * old + 1;
            s3 += 3 * old * old + 3 * old + 1;
            t1 += cntv;
            t2 += cntv * cntv;
            t3 += cntv * (2 * old + 1);
            *left.entry(v).or_insert(0) = l + 1;
        }
        answer as i32
    }
}
