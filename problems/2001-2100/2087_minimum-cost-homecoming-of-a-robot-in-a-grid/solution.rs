impl Solution {
    pub fn min_cost(startPos: Vec<i32>, homePos: Vec<i32>, rowCosts: Vec<i32>, colCosts: Vec<i32>) -> i64 {
        let mut total = 0_i64;
        let mut row = startPos[0];
        while row != homePos[0] {
            row += if row < homePos[0] { 1 } else { -1 };
            total += rowCosts[row as usize] as i64;
        }

        let mut col = startPos[1];
        while col != homePos[1] {
            col += if col < homePos[1] { 1 } else { -1 };
            total += colCosts[col as usize] as i64;
        }
        total
    }
}
