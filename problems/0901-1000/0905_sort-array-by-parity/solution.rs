// The judge pins one exact answer: the even values in the order they appear,
// then the odd values in the order they appear. One scan routes each value
// into its group as it is read — a value's arrival order inside its group is
// its input order, so the concatenation of the two groups is the answer, with
// no value compared by magnitude.
impl Solution {
    pub fn sort_array_by_parity(nums: Vec<i32>) -> Vec<i32> {
        let (evens, odds): (Vec<i32>, Vec<i32>) = nums.into_iter().partition(|&value| value % 2 == 0);
        evens.into_iter().chain(odds).collect()
    }
}
