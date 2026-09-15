impl Solution {
    pub fn count_matching_subarrays(nums: Vec<i32>, pattern: Vec<i32>) -> i32 {
        // Reduce every adjacent pair to its relation: rise, fall, or tie.
        let signs: Vec<i32> = nums
            .windows(2)
            .map(|pair| (pair[1] > pair[0]) as i32 - (pair[1] < pair[0]) as i32)
            .collect();

        // A size m+1 subarray matches iff its m relations equal the pattern.
        let m = pattern.len();
        let mut count = 0;
        for start in 0..signs.len() + 1 - m {
            if signs[start..start + m] == pattern[..] {
                count += 1;
            }
        }
        count
    }
}
