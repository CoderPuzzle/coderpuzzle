impl Solution {
    pub fn minimum_replacement(nums: Vec<i32>) -> i64 {
        // Splitting only shrinks numbers, so never touch the last element:
        // keep `bound` = max value allowed here given a sorted suffix.
        let mut ops: i64 = 0;
        let mut bound: i64 = nums[nums.len() - 1] as i64;
        for i in (0..nums.len() - 1).rev() {
            let x = nums[i] as i64;
            if x <= bound {
                // Already fits the sorted suffix; it tightens the bound.
                bound = x;
            } else {
                // Fewest pieces covering sum x with each <= bound; k even
                // pieces leave the largest at ceil(x/k) <= bound.
                let k = (x + bound - 1) / bound;
                ops += k - 1;
                // Even split maximizes the smallest piece (floor(x/k)),
                // leaving the most room for elements further left.
                bound = x / k;
            }
        }
        ops
    }
}
