impl Solution {
    pub fn get_sum_absolute_differences(nums: Vec<i32>) -> Vec<i32> {
        let n = nums.len();
        let total: i64 = nums.iter().map(|&x| x as i64).sum();
        let mut prefix: i64 = 0;
        let mut result = Vec::with_capacity(n);
        for i in 0..n {
            let x = nums[i] as i64;
            // Sorted order dissolves the absolute values: every element left
            // of i is <= x and every element right of i is >= x, so each side
            // collapses into one signed sum.
            // Left part: x*i - prefix, the sum of the first i elements.
            let left = x * i as i64 - prefix;
            let suffix = total - prefix - x;
            // Right part: suffix sum - x*(n - i - 1).
            let right = suffix - x * (n as i64 - i as i64 - 1);
            // Ties are exact — equal values contribute 0 on either side.
            result.push((left + right) as i32);
            prefix += x;
        }
        result
    }
}
