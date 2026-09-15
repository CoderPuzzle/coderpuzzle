impl Solution {
    pub fn min_sum(nums1: Vec<i32>, nums2: Vec<i32>) -> i64 {
        // Sums reach 10^5 * 10^6 = 10^11, past 32 bits: keep every sum in
        // i64.
        let mut sum1: i64 = 0;
        let mut sum2: i64 = 0;
        let mut zeros1: i64 = 0;
        let mut zeros2: i64 = 0;
        for num in &nums1 {
            sum1 += *num as i64;
            if *num == 0 {
                zeros1 += 1;
            }
        }
        for num in &nums2 {
            sum2 += *num as i64;
            if *num == 0 {
                zeros2 += 1;
            }
        }
        // Cheapest fill: every zero becomes 1. An array with no zeros is
        // stuck at its exact sum and can never move.
        if zeros1 == 0 && zeros2 == 0 {
            return if sum1 == sum2 { sum1 } else { -1 };
        }
        if zeros1 == 0 {
            // nums2 can take any sum >= sum2 + zeros2, so it must be able to
            // climb exactly to the stuck sum1.
            return if sum1 >= sum2 + zeros2 { sum1 } else { -1 };
        }
        if zeros2 == 0 {
            return if sum2 >= sum1 + zeros1 { sum2 } else { -1 };
        }
        // Both arrays can climb freely from their all-1 fill: meet at the
        // higher floor.
        return std::cmp::max(sum1 + zeros1, sum2 + zeros2);
    }
}
