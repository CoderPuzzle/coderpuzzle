impl Solution {
    pub fn last_visited_integers(nums: Vec<i32>) -> Vec<i32> {
        // seen holds the positives with the most recent one at the front; k
        // counts consecutive -1s and every positive resets it, so each -1
        // either reads the k-th element from the front of seen — the k-th
        // most recent positive — or appends -1 when seen is too short.
        let mut seen: Vec<i32> = Vec::new();
        let mut ans: Vec<i32> = Vec::new();
        let mut k: usize = 0;
        for num in nums {
            if num != -1 {
                seen.insert(0, num);
                k = 0;
            } else {
                k += 1;
                if k <= seen.len() {
                    ans.push(seen[k - 1]);
                } else {
                    ans.push(-1);
                }
            }
        }
        ans
    }
}
