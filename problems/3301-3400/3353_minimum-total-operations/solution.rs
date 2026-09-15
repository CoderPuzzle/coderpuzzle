impl Solution {
    pub fn min_operations(nums: Vec<i32>) -> i32 {
        // Adding k to a prefix touches exactly one adjacent difference: the
        // one straddling the prefix's end. A whole-array prefix shifts
        // every element equally and a difference can be zeroed by picking
        // k as that difference, so each operation removes at most one
        // nonzero adjacent difference - and every nonzero one is removable.
        nums.windows(2).filter(|w| w[0] != w[1]).count() as i32
    }
}
