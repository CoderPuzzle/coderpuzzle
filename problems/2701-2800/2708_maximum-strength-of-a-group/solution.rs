impl Solution {
    // Sorting gathers the negatives at the front. Zeros never help (any kept
    // product has magnitude >= 1), and negatives only pay off in even counts,
    // so multiply every nonzero element except — when the negative count is
    // odd — nums[neg - 1], the one closest to zero. If nothing survives, the
    // best group is the largest single element. Products reach 9^13 ~ 2.5e12,
    // so multiply in 64 bits.
    pub fn max_strength(mut nums: Vec<i32>) -> i64 {
        nums.sort_unstable();
        let neg = nums.iter().filter(|&&v| v < 0).count();
        let skip = if neg % 2 == 1 { neg - 1 } else { usize::MAX };
        let mut prod: i64 = 1;
        let mut kept = false;
        for (i, &v) in nums.iter().enumerate() {
            if i == skip || v == 0 {
                continue;
            }
            prod *= v as i64;
            kept = true;
        }
        if kept {
            prod
        } else {
            nums[nums.len() - 1] as i64
        }
    }
}
