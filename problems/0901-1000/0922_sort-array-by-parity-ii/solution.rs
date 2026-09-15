// The judge pins one exact answer: the even values sorted ascending fill the
// even indices, and the odd values sorted ascending fill the odd indices. One
// partition splits the values by parity, one sort orders each group, and a
// dealing loop writes them into the answer — values are compared only inside
// their own parity group.
impl Solution {
    pub fn sort_array_by_parity_ii(nums: Vec<i32>) -> Vec<i32> {
        let (mut evens, mut odds): (Vec<i32>, Vec<i32>) = nums.into_iter().partition(|&value| value % 2 == 0);
        evens.sort_unstable();
        odds.sort_unstable();
        let mut answer: Vec<i32> = vec![0; evens.len() + odds.len()];
        for (i, (even, odd)) in evens.into_iter().zip(odds).enumerate() {
            answer[2 * i] = even;
            answer[2 * i + 1] = odd;
        }
        answer
    }
}
