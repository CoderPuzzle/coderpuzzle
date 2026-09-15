impl Solution {
    pub fn find_error_nums(nums: Vec<i32>) -> Vec<i32> {
        // The values in nums are the numbers 1..n with one value doubled and
        // one lost, so counting occurrences settles both questions at once:
        // slot v of a count array indexed by value holds 2 for the
        // duplicated value and 0 for the missing one.
        let mut counts = vec![0; nums.len() + 1];
        for &value in &nums {
            counts[value as usize] += 1;
        }
        // One sweep over the value range 1..n reads the counts back; every
        // other slot holds 1 and carries no information, so exactly one
        // duplicate and one gap are found.
        let mut duplicate = 0;
        let mut missing = 0;
        for value in 1..=nums.len() {
            if counts[value] == 2 {
                duplicate = value as i32;
            } else if counts[value] == 0 {
                missing = value as i32;
            }
        }
        vec![duplicate, missing]
    }
}
