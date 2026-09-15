impl Solution {
    pub fn sort_even_odd(nums: Vec<i32>) -> Vec<i32> {
        // Strides 2 and 1-from-2 split the array by index parity; sorting
        // each slice its own direction and writing back through the same
        // strides re-interleaves them without touching positions.
        let mut evens: Vec<i32> = nums.iter().step_by(2).copied().collect();
        let mut odds: Vec<i32> = nums.iter().skip(1).step_by(2).copied().collect();
        evens.sort_unstable();
        odds.sort_unstable_by(|a, b| b.cmp(a));
        let mut result = nums.clone();
        for (slot, value) in result.iter_mut().step_by(2).zip(evens) {
            *slot = value;
        }
        for (slot, value) in result.iter_mut().skip(1).step_by(2).zip(odds) {
            *slot = value;
        }
        result
    }
}
