impl Solution {
    // One scan: the closest occurrence of target is whichever index
    // minimizes abs(i - start).
    pub fn get_min_distance(nums: Vec<i32>, target: i32, start: i32) -> i32 {
        let n = nums.len() as i32;
        let mut best = n;
        for (i, &v) in nums.iter().enumerate() {
            if v == target {
                best = best.min((i as i32 - start).abs());
            }
        }
        best
    }
}
