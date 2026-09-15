impl Solution {
    pub fn min_operations(nums1: Vec<i32>, nums2: Vec<i32>) -> i32 {
        // Reachable sums are [n, 6n] per array, so equality is impossible
        // exactly when those ranges are disjoint. Otherwise tally each
        // operation's best gain (v-1 for elements of the larger-sum array,
        // 6-v for the smaller) and spend the largest gains first.
        if nums1.len() > 6 * nums2.len() || nums2.len() > 6 * nums1.len() {
            return -1;
        }
        let sum1: i32 = nums1.iter().sum();
        let sum2: i32 = nums2.iter().sum();
        if sum1 == sum2 {
            return 0;
        }
        let (big, small) = if sum1 > sum2 {
            (&nums1, &nums2)
        } else {
            (&nums2, &nums1)
        };
        let mut gap = (sum1 - sum2).abs();
        let mut gains = [0i32; 6];
        for &v in big {
            gains[(v - 1) as usize] += 1;
        }
        for &v in small {
            gains[(6 - v) as usize] += 1;
        }
        let mut ops = 0;
        for g in (1..=5).rev() {
            let mut take = (gap + g - 1) / g;
            if gains[g as usize] < take {
                take = gains[g as usize];
            }
            ops += take;
            gap -= take * g;
            if gap <= 0 {
                break;
            }
        }
        ops
    }
}
