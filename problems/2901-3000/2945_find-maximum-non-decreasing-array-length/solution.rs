impl Solution {
    pub fn find_maximum_length(nums: Vec<i32>) -> i32 {
        // Every reachable array is nums cut into contiguous blocks holding
        // block sums. dp[i] is the most blocks over the first i elements
        // and last[i] the smallest final-block sum among those partitions.
        // A block (j, i] extends partition j when pre[i] - pre[j] >=
        // last[j]. dp never decreases (the previous partition survives
        // merging its final block with the new element), so the best
        // predecessor is the rightmost valid one: keep predecessors on a
        // frontier ordered by pre[j] + last[j], pop entries a later index
        // dominates, and binary-search the largest key <= pre[i]. Prefix
        // sums reach 10^10, so the running totals are 64-bit.
        let n = nums.len();
        let mut pre = vec![0i64; n + 1];
        for i in 0..n {
            pre[i + 1] = pre[i] + nums[i] as i64;
        }
        let mut dp = vec![0i32; n + 1];
        let mut last = vec![0i64; n + 1];
        let mut stack: Vec<usize> = vec![0];
        let mut keys: Vec<i64> = vec![0];
        for i in 1..=n {
            let mut lo = 0usize;
            let mut hi = keys.len() - 1;
            while lo < hi {
                let mid = (lo + hi + 1) / 2;
                if keys[mid] <= pre[i] {
                    lo = mid;
                } else {
                    hi = mid - 1;
                }
            }
            let j = stack[lo];
            dp[i] = dp[j] + 1;
            last[i] = pre[i] - pre[j];
            let key = pre[i] + last[i];
            while dp[*stack.last().unwrap()] <= dp[i] && *keys.last().unwrap() >= key {
                stack.pop();
                keys.pop();
            }
            stack.push(i);
            keys.push(key);
        }
        dp[n]
    }
}
