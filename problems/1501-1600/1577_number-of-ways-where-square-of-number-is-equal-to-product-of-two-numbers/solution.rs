use std::collections::HashMap;

impl Solution {
    pub fn num_triplets(nums1: Vec<i32>, nums2: Vec<i32>) -> i32 {
        (Self::count_type(&nums1, &nums2) + Self::count_type(&nums2, &nums1)) as i32
    }

    // Counts index pairs (j, k), j < k, in b whose product equals some
    // a[i]^2, summed over every i in a.
    fn count_type(a: &[i32], b: &[i32]) -> i64 {
        let mut freq: HashMap<i64, i64> = HashMap::new();
        for &v in b {
            *freq.entry(v as i64).or_insert(0) += 1;
        }
        let mut distinct: Vec<i64> = freq.keys().copied().collect();
        distinct.sort_unstable();

        let mut total: i64 = 0;
        for &x in a {
            // Squares reach up to (1e5)^2 = 1e10, outside i32 range.
            let target = (x as i64) * (x as i64);
            for &v in &distinct {
                if v * v > target {
                    break;
                }
                if target % v != 0 {
                    continue;
                }
                let other = target / v;
                if other == v {
                    let c = freq[&v];
                    total += c * (c - 1) / 2;
                } else if let Some(&c) = freq.get(&other) {
                    total += freq[&v] * c;
                }
            }
        }
        total
    }
}
