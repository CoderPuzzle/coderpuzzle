impl Solution {
    pub fn max_ascending_sum(nums: Vec<i32>) -> i32 {
        // One sweep: cur is the sum of the strictly increasing run
        // ending here; extend it while the values strictly rise,
        // restart at the bare element otherwise (equal neighbours
        // break the run). Every value is positive, so the fullest
        // run ending at each index is its best subarray. n * max
        // <= 10^4 and strict ascent forces distinct values, capping
        // the true maximum at 5050 - far inside i32 range.
        let (mut best, mut cur) = (nums[0], nums[0]);
        for i in 1..nums.len() {
            cur = if nums[i] > nums[i - 1] { cur + nums[i] } else { nums[i] };
            best = best.max(cur);
        }
        best
    }
}
