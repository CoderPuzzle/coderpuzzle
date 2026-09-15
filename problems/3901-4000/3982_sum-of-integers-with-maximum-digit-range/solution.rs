impl Solution {
    pub fn max_digit_range(nums: Vec<i32>) -> i64 {
        let mut ranges = Vec::with_capacity(nums.len());
        let mut maximum = 0;
        for &value in &nums {
            let mut remaining = value;
            let mut low = 9;
            let mut high = 0;
            while remaining > 0 {
                let digit = remaining % 10;
                low = low.min(digit);
                high = high.max(digit);
                remaining /= 10;
            }
            let range = high - low;
            maximum = maximum.max(range);
            ranges.push(range);
        }
        nums.iter()
            .zip(ranges.iter())
            .filter(|(_, &range)| range == maximum)
            .map(|(&value, _)| value as i64)
            .sum()
    }
}
