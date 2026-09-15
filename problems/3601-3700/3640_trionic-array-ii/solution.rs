impl Solution {
    pub fn max_sum_trionic(nums: Vec<i32>) -> i64 {
        // Best sums of subarrays ending at the previous element: s0 inside
        // the first climb (length >= 2), s1 descending after a finished
        // climb, s2 a full trionic mid-final-climb. Unreachable sits on a
        // sentinel far below any real sum.
        let neg = -(1_i64 << 60);
        let (mut s0, mut s1, mut s2) = (neg, neg, neg);
        let mut best = neg;
        for i in 1..nums.len() {
            let (prev, x) = (nums[i - 1] as i64, nums[i] as i64);
            if x > prev {
                // Rising step: the final climb continues or opens from a
                // finished descent; the first climb extends from itself or
                // grows past the lone previous element.
                s2 = s2.max(s1) + x;
                s0 = s0.max(prev) + x;
                s1 = neg;
            } else if x < prev {
                // Falling step: the descent continues or opens from a
                // finished two-element climb; climbs cannot persist.
                s1 = s1.max(s0) + x;
                s0 = neg;
                s2 = neg;
            } else {
                // Equal neighbors break strictness on both sides.
                s0 = neg;
                s1 = neg;
                s2 = neg;
            }
            best = best.max(s2);
        }
        best
    }
}
