use std::collections::HashMap;

impl Solution {
    // Coprimality of the two products is decided by shared prime
    // factors, never by the products themselves: with n up to 10^4 and
    // values up to 10^6, both sides reach thousands of digits. Boundary
    // i works exactly when no prime's occurrence span [first, last]
    // straddles it. A smallest-prime-factor sieve factorizes each
    // element in O(log value); a difference array blocks the straddled
    // boundaries; the first open boundary in [0, n - 2] wins.
    pub fn find_valid_split(nums: Vec<i32>) -> i32 {
        let top = *nums.iter().max().unwrap() as usize;
        let mut spf: Vec<usize> = (0..=top).collect();
        let mut d = 2usize;
        while d * d <= top {
            if spf[d] == d {
                let mut multiple = d * d;
                while multiple <= top {
                    if spf[multiple] == multiple {
                        spf[multiple] = d;
                    }
                    multiple += d;
                }
            }
            d += 1;
        }
        let mut first: HashMap<i32, usize> = HashMap::new();
        let mut last: HashMap<i32, usize> = HashMap::new();
        for (index, &value) in nums.iter().enumerate() {
            let mut value = value as usize;
            while value > 1 {
                let prime = spf[value] as i32;
                first.entry(prime).or_insert(index);
                last.insert(prime, index);
                while value % prime as usize == 0 {
                    value /= prime as usize;
                }
            }
        }
        let n = nums.len();
        // max_split stays signed so n == 1 (no legal split point) never
        // underflows the boundary arithmetic below.
        let max_split = n as i64 - 2;
        let mut blocked = vec![0i32; n + 1];
        for (prime, &lo) in &first {
            let hi = std::cmp::min(last[prime] as i64 - 1, max_split);
            if lo as i64 <= hi {
                blocked[lo as usize] += 1;
                blocked[(hi + 1) as usize] -= 1;
            }
        }
        let mut running: i32 = 0;
        for i in 0..n.saturating_sub(1) {
            running += blocked[i];
            if running == 0 {
                return i as i32;
            }
        }
        -1
    }
}
