impl Solution {
    pub fn minimum_right_shifts(nums: Vec<i32>) -> i32 {
        let n = nums.len();
        let mut descents = 0;
        let mut pivot = 0usize;
        for i in 0..n {
            if nums[i] > nums[(i + 1) % n] {
                descents += 1;
                pivot = i;
            }
        }
        if descents == 0 {
            return 0;
        }
        if descents > 1 {
            return -1;
        }
        (n - 1 - pivot) as i32
    }
}
