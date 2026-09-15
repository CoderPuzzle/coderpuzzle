impl Solution {
    pub fn get_final_state(mut nums: Vec<i32>, k: i32, multiplier: i32) -> Vec<i32> {
        // The bounds are tiny (n <= 100, k <= 10), so replay the process
        // literally: each operation makes one linear scan for the first
        // occurrence of the minimum — a strict '<' comparison never replaces
        // an equal earlier value, so ties resolve to the leftmost index —
        // and multiplies that slot. No heap is needed to accelerate ten
        // short scans, and no wider arithmetic either: an element is
        // multiplied at most k times, so it never exceeds
        // 100 * 5^10 = 976562500 < 2^31 - 1.
        let n = nums.len();
        for _ in 0..k {
            let mut idx = 0usize;
            for i in 1..n {
                if nums[i] < nums[idx] {
                    idx = i;
                }
            }
            nums[idx] *= multiplier;
        }
        nums
    }
}
