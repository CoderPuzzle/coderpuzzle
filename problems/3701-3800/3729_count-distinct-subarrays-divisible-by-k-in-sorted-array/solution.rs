use std::collections::HashMap;

impl Solution {
    pub fn num_good_subarrays(nums: Vec<i32>, k: i32) -> i64 {
        // Positional sweep: window [l, r] is good exactly when the prefixes
        // before l and through r leave the same remainder mod k. Residue
        // plus element can pass 2^31, so the running sum stays in 64 bits.
        let mut residue_counts: HashMap<i32, i64> = HashMap::new();
        residue_counts.insert(0, 1);
        let mut residue = 0i64;
        let mut total = 0i64;
        for &value in &nums {
            residue = (residue + value as i64) % k as i64;
            let seen = *residue_counts.get(&(residue as i32)).unwrap_or(&0);
            total += seen;
            *residue_counts.entry(residue as i32).or_insert(0) += 1;
        }
        // Identical value sequences repeat only inside one run of equal
        // values: a span crossing a strict increase is pinned by where it
        // crosses and how much it takes from each edge. A qualifying length
        // L inside a run of length a occupies a - L + 1 positions but counts
        // once, so subtract the a - L excess of every qualifying length. The
        // qualifying lengths are multiples of k / gcd(v, k).
        let n = nums.len();
        let mut i = 0usize;
        while i < n {
            let mut j = i;
            while j < n && nums[j] == nums[i] {
                j += 1;
            }
            let run_length = (j - i) as i64;
            let step = k as i64 / gcd(nums[i] as i64, k as i64);
            let repeated = run_length / step;
            total -= repeated * run_length - step * repeated * (repeated + 1) / 2;
            i = j;
        }
        total
    }
}

fn gcd(a: i64, b: i64) -> i64 {
    let mut a = a;
    let mut b = b;
    while b != 0 {
        let t = a % b;
        a = b;
        b = t;
    }
    a
}
