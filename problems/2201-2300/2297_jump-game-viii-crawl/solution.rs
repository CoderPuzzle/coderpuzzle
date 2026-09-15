impl Solution {
    pub fn min_cost(nums: Vec<i32>, costs: Vec<i32>) -> i64 {
        let n = nums.len();
        let mut next_ge: Vec<Option<usize>> = vec![None; n];
        let mut next_lt: Vec<Option<usize>> = vec![None; n];
        let mut greater_stack: Vec<usize> = Vec::new();
        let mut lower_stack: Vec<usize> = Vec::new();
        for index in (0..n).rev() {
            while let Some(&top) = greater_stack.last() {
                if nums[top] < nums[index] {
                    greater_stack.pop();
                } else {
                    break;
                }
            }
            next_ge[index] = greater_stack.last().copied();
            greater_stack.push(index);
            while let Some(&top) = lower_stack.last() {
                if nums[top] >= nums[index] {
                    lower_stack.pop();
                } else {
                    break;
                }
            }
            next_lt[index] = lower_stack.last().copied();
            lower_stack.push(index);
        }
        const INF: i64 = 1_i64 << 62;
        let mut best = vec![INF; n];
        best[0] = 0;
        for index in 0..n {
            for target in [next_ge[index], next_lt[index]] {
                if let Some(j) = target {
                    let candidate = best[index] + costs[j] as i64;
                    if candidate < best[j] {
                        best[j] = candidate;
                    }
                }
            }
        }
        best[n - 1]
    }
}
