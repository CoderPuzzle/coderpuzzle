pub struct SubrectangleQueries {
    rect: Vec<Vec<i64>>,
}

impl SubrectangleQueries {
    pub fn new(rectangle: Vec<Vec<i64>>) -> Self {
        SubrectangleQueries { rect: rectangle }
    }

    pub fn update_subrectangle(&mut self, row1: i32, col1: i32, row2: i32, col2: i32, new_value: i64) {
        for r in row1..=row2 {
            for c in col1..=col2 {
                self.rect[r as usize][c as usize] = new_value;
            }
        }
    }

    pub fn get_value(&mut self, row: i32, col: i32) -> i64 {
        self.rect[row as usize][col as usize]
    }
}
