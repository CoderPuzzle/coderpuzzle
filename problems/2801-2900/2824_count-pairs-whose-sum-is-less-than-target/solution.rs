impl Solution {
    pub fn count_pairs(nums: Vec<i32>, target: i32) -> i32 {
        // Unordered index pairs are unaffected by order, so sorting a copy is
        // safe. Values lie in [-50, 50], so every pair sum stays inside i32.
        let mut values = nums.clone();
        values.sort();
        let mut answer = 0;
        let mut lo: usize = 0;
        let mut hi = values.len() - 1;
        while lo < hi {
            if values[lo] + values[hi] < target {
                answer += (hi - lo) as i32;
                lo += 1;
            } else {
                hi -= 1;
            }
        }
        answer
    }
}
