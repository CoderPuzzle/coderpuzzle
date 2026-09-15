impl Solution {
    pub fn min_cost(nums: Vec<i32>, queries: Vec<Vec<i32>>) -> Vec<i32> {
        let n = nums.len();
        let mut forward = vec![0; n.saturating_sub(1)];
        let mut backward = vec![0; n.saturating_sub(1)];

        for i in 0..n {
            let closest = if i == 0 {
                1
            } else if i == n - 1 {
                n - 2
            } else if nums[i] - nums[i - 1] <= nums[i + 1] - nums[i] {
                i - 1
            } else {
                i + 1
            };
            if i > 0 {
                backward[i - 1] = if closest == i - 1 { 1 } else { nums[i] - nums[i - 1] };
            }
            if i < n - 1 {
                forward[i] = if closest == i + 1 { 1 } else { nums[i + 1] - nums[i] };
            }
        }

        let mut prefix_forward = vec![0i64; n];
        let mut prefix_backward = vec![0i64; n];
        for i in 1..n {
            prefix_forward[i] = prefix_forward[i - 1] + forward[i - 1] as i64;
            prefix_backward[i] = prefix_backward[i - 1] + backward[i - 1] as i64;
        }

        queries
            .into_iter()
            .map(|query| {
                let left = query[0] as usize;
                let right = query[1] as usize;
                if left <= right {
                    (prefix_forward[right] - prefix_forward[left]) as i32
                } else {
                    (prefix_backward[left] - prefix_backward[right]) as i32
                }
            })
            .collect()
    }
}
