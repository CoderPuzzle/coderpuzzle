// A triple's AND vanishes exactly when the first two values' AND is a
// submask of the third value's complement. One pass over all n^2 ordered
// pairs records f[v] = pairs with nums[i] & nums[j] == v, a subset zeta
// transform turns f into h[m] = sum of f over the submasks of m, and each
// k then contributes h[!nums[k] & 0xFFFF].
impl Solution {
    pub fn count_triplets(nums: Vec<i32>) -> i64 {
        let full = 1usize << 16;
        let mut f = vec![0i64; full];
        for &x in &nums {
            for &y in &nums {
                f[(x & y) as usize] += 1;
            }
        }
        for b in 0..16 {
            let bit = 1usize << b;
            for mask in 0..full {
                if mask & bit != 0 {
                    f[mask] += f[mask ^ bit];
                }
            }
        }
        let mut answer = 0i64;
        for &x in &nums {
            answer += f[(!x & 0xFFFF) as usize];
        }
        answer
    }
}
