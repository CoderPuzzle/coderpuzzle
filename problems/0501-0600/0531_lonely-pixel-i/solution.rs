impl Solution {
    pub fn find_lonely_pixel(picture: Vec<Vec<String>>) -> i32 {
        // A pixel is lonely exactly when it is the only 'B' in its row and
        // the only 'B' in its column. One pass tallies both totals per row
        // and per column; a second pass checks each 'B' against them.
        let m = picture.len();
        let n = picture[0].len();
        let mut row_count = vec![0usize; m];
        let mut col_count = vec![0usize; n];
        for i in 0..m {
            for j in 0..n {
                if picture[i][j] == "B" {
                    row_count[i] += 1;
                    col_count[j] += 1;
                }
            }
        }
        let mut lonely = 0;
        for i in 0..m {
            for j in 0..n {
                if picture[i][j] == "B" && row_count[i] == 1 && col_count[j] == 1 {
                    lonely += 1;
                }
            }
        }
        lonely as i32
    }
}
