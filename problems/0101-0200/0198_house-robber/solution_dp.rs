impl Solution {
    pub fn rob(nums: Vec<i32>) -> i32 {
        // Rolling two-variable DP: cur = best through house i-1, prev = best
        // through house i-2; both start at 0 ("nothing robbed yet").
        let (mut prev, mut cur) = (0i64, 0i64);
        for &x in &nums {
            // Skip this house (keep cur) or rob it (prev + x).
            let next = cur.max(prev + x as i64);
            prev = cur;
            cur = next;
        }
        cur as i32
    }
}
