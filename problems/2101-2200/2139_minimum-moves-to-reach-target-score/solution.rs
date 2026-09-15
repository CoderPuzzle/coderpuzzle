impl Solution {
    pub fn min_moves(mut target: i32, mut max_doubles: i32) -> i32 {
        let mut moves = 0;
        while target > 1 && max_doubles > 0 {
            if target % 2 == 1 {
                target -= 1;
            } else {
                target /= 2;
                max_doubles -= 1;
            }
            moves += 1;
        }
        moves + target - 1
    }
}
