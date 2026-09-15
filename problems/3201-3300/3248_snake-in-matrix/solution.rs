impl Solution {
    pub fn final_position_of_snake(n: i32, commands: Vec<String>) -> i32 {
        // Each command moves exactly one coordinate by one step; the
        // statement's guarantee keeps both within [0, n), so no boundary
        // checks are needed.
        let (mut row, mut col) = (0, 0);
        for command in &commands {
            match command.as_str() {
                "UP" => row -= 1,
                "DOWN" => row += 1,
                "LEFT" => col -= 1,
                _ => col += 1, // "RIGHT"
            }
        }
        row * n + col
    }
}
