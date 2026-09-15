impl Solution {
    pub fn min_cost(nums: Vec<i32>, costs: Vec<i32>) -> i64 {
        let n = nums.len();
        // from any i, jump to the first later j with nums[j] >= nums[i],
        // or the first later j with nums[j] < nums[i]; nothing farther is reachable
        let mut next_ge = vec![-1i32; n];
        let mut next_sm = vec![-1i32; n];
        let mut stack: Vec<usize> = Vec::new();
        for i in 0..n {
            while let Some(&top) = stack.last() {
                if nums[i] >= nums[top] {
                    // i is exactly top's first >= successor
                    next_ge[top] = i as i32;
                    stack.pop();
                } else {
                    break;
                }
            }
            stack.push(i);
        }
        stack.clear();
        for i in 0..n {
            while let Some(&top) = stack.last() {
                if nums[i] < nums[top] {
                    // strict < here: plateaus (==) belong to the >= stack
                    next_sm[top] = i as i32;
                    stack.pop();
                } else {
                    break;
                }
            }
            stack.push(i);
        }
        let inf = 1i64 << 60;
        // dp[i] = min cost to land on i; jumps only go forward, so the graph is a DAG
        let mut dp = vec![inf; n];
        dp[0] = 0;
        // every edge points to a strictly larger index, so one forward sweep
        // visits each node after all of its predecessors
        for i in 0..n - 1 {
            for j in [next_ge[i], next_sm[i]] {
                if j >= 0 {
                    let ju = j as usize;
                    if dp[i] + (costs[ju] as i64) < dp[ju] {
                        dp[ju] = dp[i] + costs[ju] as i64;
                    }
                }
            }
        }
        dp[n - 1]
    }
}
