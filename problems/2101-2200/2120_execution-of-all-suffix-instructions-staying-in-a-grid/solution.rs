impl Solution {
    pub fn execute_instructions(n: i32, startPos: Vec<i32>, s: String) -> Vec<i32> {
        let instructions = s.as_bytes();
        let mut answer = vec![0; instructions.len()];
        for start in 0..instructions.len() {
            let mut row = startPos[0];
            let mut col = startPos[1];
            for &instruction in &instructions[start..] {
                let (mut next_row, mut next_col) = (row, col);
                match instruction {
                    b'L' => next_col -= 1,
                    b'R' => next_col += 1,
                    b'U' => next_row -= 1,
                    _ => next_row += 1,
                }
                if next_row < 0 || next_row >= n || next_col < 0 || next_col >= n {
                    break;
                }
                row = next_row;
                col = next_col;
                answer[start] += 1;
            }
        }
        answer
    }
}
