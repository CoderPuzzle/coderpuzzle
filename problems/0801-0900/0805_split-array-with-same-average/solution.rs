use std::collections::{HashMap, HashSet};

impl Solution {
    // Enumerate one half (at most 2^(n/2) subsets), grouping
    // achievable sums by subset size.
    fn subset_sums(arr: &[i32]) -> HashMap<i32, HashSet<i64>> {
        let mut d: HashMap<i32, HashSet<i64>> = HashMap::new();
        let m = arr.len();
        for mask in 0..(1usize << m) {
            let mut s: i64 = 0;
            let mut sz: i32 = 0;
            for i in 0..m {
                if (mask >> i) & 1 == 1 {
                    s += arr[i] as i64;
                    sz += 1;
                }
            }
            d.entry(sz).or_insert_with(HashSet::new).insert(s);
        }
        d
    }

    pub fn split_array_same_average(nums: Vec<i32>) -> bool {
        let n = nums.len();
        let mut total: i64 = 0;
        for &v in &nums {
            total += v as i64;
        }

        let mid = n / 2;
        let left = Self::subset_sums(&nums[..mid]);
        let right = Self::subset_sums(&nums[mid..]);
        let nr = n - mid;

        // Equal averages force both parts to the whole-array average
        // total/n, so seek a proper subset of size s summing to
        // total*s/n; only sizes with an integer target can work, and
        // s in 1..n-1 keeps both parts non-empty.
        for s in 1..n {
            let s = s as i64;
            if (total * s) % (n as i64) != 0 {
                continue;
            }
            let target = total * s / (n as i64);
            // Clamp s1 so both pieces actually fit in their halves.
            let lo = std::cmp::max(0, s - nr as i64);
            let hi = std::cmp::min(mid as i64, s);
            for s1 in lo..=hi {
                let s2 = s - s1;
                if let Some(lset) = left.get(&(s1 as i32)) {
                    if let Some(rset) = right.get(&(s2 as i32)) {
                        // Assemble: a left sum v plus a right sum
                        // target - v builds a valid subset (only sums,
                        // not identities).
                        for &v in lset {
                            if rset.contains(&(target - v)) {
                                return true;
                            }
                        }
                    }
                }
            }
        }
        false
    }
}
