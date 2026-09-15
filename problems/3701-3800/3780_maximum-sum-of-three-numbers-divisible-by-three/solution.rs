impl Solution {
    // Group values by remainder mod 3 and keep the three largest of each
    // group -- no valid triplet ever needs a group's fourth-largest value.
    // The only remainder patterns summing to 0 mod 3 are 000, 111, 222,
    // and 012, so at most nine values decide everything; the answer is at
    // most 3 * 10^5, safely inside 32 bits. If no pattern is achievable
    // the answer stays 0.
    pub fn maximum_sum(nums: Vec<i32>) -> i32 {
        let mut top: [Vec<i32>; 3] = [Vec::new(), Vec::new(), Vec::new()];
        for &v in &nums {
            top[(v % 3) as usize].push(v);
        }
        for group in top.iter_mut() {
            group.sort_unstable_by(|a, b| b.cmp(a));
            group.truncate(3);
        }
        let take = |group: &Vec<i32>, k: usize| -> i32 {
            if group.len() < k {
                -1
            } else {
                group.iter().take(k).sum()
            }
        };
        let mut best = 0;
        for r in 0..3 {
            let total = take(&top[r], 3);
            if total > best {
                best = total;
            }
        }
        let (a, b, c) = (take(&top[0], 1), take(&top[1], 1), take(&top[2], 1));
        if a >= 0 && b >= 0 && c >= 0 && a + b + c > best {
            best = a + b + c;
        }
        best
    }
}
