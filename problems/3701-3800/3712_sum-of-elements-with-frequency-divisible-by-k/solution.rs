impl Solution {
    pub fn sum_divisible_by_k(nums: Vec<i32>, k: i32) -> i32 {
        // Qualification is decided per value: drop every element into the
        // bucket of its own value; values are bounded by 100, so the value
        // itself indexes a fixed array of counters.
        let mut counts = [0i32; 101];
        for &num in &nums {
            counts[num as usize] += 1;
        }
        // A bucket qualifies when its count is a positive multiple of k;
        // it then contributes its value once per occurrence.
        let mut total = 0;
        for value in 1..=100usize {
            let count = counts[value];
            if count > 0 && count % k == 0 {
                total += value as i32 * count;
            }
        }
        total
    }
}
