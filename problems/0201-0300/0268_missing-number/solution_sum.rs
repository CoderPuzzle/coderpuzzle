impl Solution {
    pub fn missing_number(nums: Vec<i32>) -> i32 {
        // Work in 64-bit: both the Gauss total and the running sum fit safely.
        let n = nums.len() as i64;
        // Sum what is actually present.
        let total: i64 = nums.iter().map(|&v| v as i64).sum();
        // n distinct values from 0..n: the one absent value is the full-range
        // total n(n+1)/2 minus this sum; the product of consecutive n and n+1
        // is always even, so the division by 2 is exact.
        (n * (n + 1) / 2 - total) as i32
    }
}
