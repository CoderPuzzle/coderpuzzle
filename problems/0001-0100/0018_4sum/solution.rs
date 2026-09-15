impl Solution {
    pub fn four_sum(mut nums: Vec<i32>, target: i32) -> Vec<Vec<i32>> {
        // Sort in place (we own the vec): every emitted quadruplet is
        // ascending, and the i-then-j scan emits them in lexicographic order.
        nums.sort_unstable();
        let n = nums.len();
        let mut result: Vec<Vec<i32>> = Vec::new();
        for i in 0..n {
            if i + 3 >= n {
                break;
            }
            // Reusing the same value for the first slot would re-find the same
            // triples, so skip runs of equal values.
            if i > 0 && nums[i] == nums[i - 1] {
                continue;
            }
            for j in i + 1..n {
                if j + 2 >= n {
                    break;
                }
                // Same skip one level down, measured against j's own start.
                if j > i + 1 && nums[j] == nums[j - 1] {
                    continue;
                }
                let (mut left, mut right) = (j + 1, n - 1);
                while left < right {
                    // Four values of up to 1e9 in magnitude overflow i32, so
                    // the running total lives in an i64.
                    let total = nums[i] as i64 + nums[j] as i64 + nums[left] as i64 + nums[right] as i64;
                    // Below target the sum must grow, so left moves right;
                    // above target, right retreats.
                    if total < target as i64 {
                        left += 1;
                    } else if total > target as i64 {
                        right -= 1;
                    } else {
                        result.push(vec![nums[i], nums[j], nums[left], nums[right]]);
                        // Both advance, then run past any runs of equal values,
                        // so the same pair is never emitted twice for one (i, j).
                        left += 1;
                        right -= 1;
                        while left < right && nums[left] == nums[left - 1] {
                            left += 1;
                        }
                        while left < right && nums[right] == nums[right + 1] {
                            right -= 1;
                        }
                    }
                }
            }
        }
        result
    }
}
