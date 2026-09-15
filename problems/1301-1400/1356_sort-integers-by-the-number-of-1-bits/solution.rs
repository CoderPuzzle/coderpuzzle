impl Solution {
    pub fn sort_by_bits(mut arr: Vec<i32>) -> Vec<i32> {
        // The order is the lexicographic order of (popcount, value).
        arr.sort_by_key(|value| (value.count_ones(), *value));
        arr
    }
}
