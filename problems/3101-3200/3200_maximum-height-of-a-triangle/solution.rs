impl Solution {
    pub fn max_height_of_triangle(red: i32, blue: i32) -> i32 {
        // Rows are built contiguously from the top with sizes 1, 2, 3,
        // ..., each row single-colored and alternating with its neighbors,
        // so once a row cannot be filled the triangle simply stops there.
        // Simulate both choices of top color with a plain level loop that
        // subtracts each row's size from its side; with at most 200 balls
        // in total the loop runs fewer than 20 levels, well inside i32.
        fn height(mut top: i32, mut other: i32) -> i32 {
            let mut level = 1;
            loop {
                let pool = if level % 2 == 1 { &mut top } else { &mut other };
                if *pool < level {
                    return level - 1;
                }
                *pool -= level;
                level += 1;
            }
        }
        height(red, blue).max(height(blue, red))
    }
}
