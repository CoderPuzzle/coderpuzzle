impl Solution {
    pub fn number_of_clean_rooms(room: Vec<Vec<i32>>) -> i32 {
        let rows = room.len();
        let cols = room[0].len();
        let dr = [0_i32, 1, 0, -1];
        let dc = [1_i32, 0, -1, 0];
        let mut seen = vec![false; rows * cols * 4];
        let mut cleaned = vec![false; rows * cols];
        let mut row = 0_usize;
        let mut col = 0_usize;
        let mut direction = 0_usize;
        let mut clean_count = 0_i32;

        while !seen[(row * cols + col) * 4 + direction] {
            seen[(row * cols + col) * 4 + direction] = true;
            let cell = row * cols + col;
            if !cleaned[cell] {
                cleaned[cell] = true;
                clean_count += 1;
            }

            let next_row = row as i32 + dr[direction];
            let next_col = col as i32 + dc[direction];
            if next_row < 0
                || next_row >= rows as i32
                || next_col < 0
                || next_col >= cols as i32
                || room[next_row as usize][next_col as usize] == 1
            {
                direction = (direction + 1) % 4;
            } else {
                row = next_row as usize;
                col = next_col as usize;
            }
        }
        clean_count
    }
}
