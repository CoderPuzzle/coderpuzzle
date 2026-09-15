impl Solution {
    pub fn max_product(nums: Vec<i32>) -> i64 {
        // Every value fits in 20 bits, so each number doubles as its own
        // bitmask; "no common set bits" means the partner's mask is a
        // subset of this mask's complement within those 20 bits.
        let mut width = 1usize;
        for &v in &nums {
            width = width.max((32 - v.leading_zeros()) as usize);
        }
        let size = 1usize << width;
        // dp[m] starts as the largest value whose set bits are exactly m
        // (0 when no element carries mask m).
        let mut dp = vec![0i32; size];
        for &v in &nums {
            if v > dp[v as usize] {
                dp[v as usize] = v;
            }
        }
        // Subset-max sweep: a mask holding bit b absorbs its b-cleared
        // twin; afterwards dp[m] is the largest value whose set bits are
        // a subset of m.
        for b in 0..width {
            let bit = 1usize << b;
            for m in 0..size {
                if m & bit != 0 && dp[m ^ bit] > dp[m] {
                    dp[m] = dp[m ^ bit];
                }
            }
        }
        // A disjoint partner of v must carry a mask that is a subset of
        // FULL ^ mv, so dp holds the best partner directly. Products
        // reach 10^12, hence i64.
        let full = (size - 1) as i32;
        let mut best = 0i64;
        for &v in &nums {
            let prod = v as i64 * dp[(full ^ v) as usize] as i64;
            if prod > best {
                best = prod;
            }
        }
        best
    }
}
