impl Solution {
    pub fn maximum_count(nums: Vec<i32>) -> i32 {
        // In a sorted array the negatives are exactly the prefix ending
        // before the first value >= 0 and the positives are exactly the
        // suffix starting at the first value >= 1. Two partition_point
        // searches fix both boundaries in O(log n); zeros belong to
        // neither side.
        let neg = nums.partition_point(|&value| value < 0);
        let pos = nums.len() - nums.partition_point(|&value| value < 1);
        neg.max(pos) as i32
    }
}
