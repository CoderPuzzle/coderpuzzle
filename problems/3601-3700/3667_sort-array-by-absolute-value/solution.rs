impl Solution {
    pub fn sort_by_absolute_value(mut nums: Vec<i32>) -> Vec<i32> {
        // Key (|value|, value): magnitude orders the array, and the signed
        // value breaks every magnitude tie so -x always lands before x.
        nums.sort_by_key(|&value| (value.abs(), value));
        // The tie-break makes the ordering total on distinct outcomes, so
        // the result is unique regardless of the sort's stability.
        nums
    }
}
