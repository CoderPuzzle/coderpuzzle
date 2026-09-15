impl Solution {
    pub fn most_competitive(nums: Vec<i32>, k: i32) -> Vec<i32> {
        let k = k as usize;
        let n = nums.len();
        // "Most competitive" is the lexicographically smallest length-k
        // subsequence — build it as a non-decreasing stack in one pass.
        let mut stack: Vec<i32> = Vec::with_capacity(k);
        for i in 0..n {
            let value = nums[i];
            let remaining = n - i;
            // Drop strictly larger tops while enough unread values remain
            // to refill to k; the strict > keeps the earlier of equal
            // values, which changes nothing lexicographically.
            while let Some(&top) = stack.last() {
                if top > value && stack.len() + remaining > k {
                    stack.pop();
                } else {
                    break;
                }
            }
            // Append only while there is room; a full stack can only
            // change through eviction above.
            if stack.len() < k {
                stack.push(value);
            }
        }
        stack
    }
}
