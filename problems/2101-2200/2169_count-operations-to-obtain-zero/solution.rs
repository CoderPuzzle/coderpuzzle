impl Solution {
    pub fn count_operations(mut num1: i32, mut num2: i32) -> i32 {
        // Straight simulation: the larger value loses a copy of the smaller
        // each round, so the pair strictly shrinks and zero arrives quickly.
        let mut operations = 0;
        while num1 != 0 && num2 != 0 {
            if num1 >= num2 {
                num1 -= num2;
            } else {
                num2 -= num1;
            }
            operations += 1;
        }
        operations
    }
}
