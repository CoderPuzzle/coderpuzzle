impl Solution {
    pub fn two_sum(numbers: Vec<i32>, target: i32) -> Vec<i32> {
        // Sorted order lets two indexes converge from both ends: the smallest
        // and largest remaining values stand in for every candidate pair, and
        // no extra storage is needed, as the statement demands.
        let mut low = 0;
        let mut high = numbers.len() - 1;
        while low < high {
            let total = numbers[low] + numbers[high];
            if total == target {
                // The statement's contract is 1-indexed.
                return vec![low as i32 + 1, high as i32 + 1];
            }
            if total < target {
                // Too small: numbers[low] plus anything above numbers[high]
                // only shrinks, so low has no partner left.
                low += 1;
            } else {
                // Too large: numbers[high] plus anything below numbers[low]
                // only shrinks, so high has no partner left.
                high -= 1;
            }
        }
        Vec::new()
    }
}
