impl Solution {
    pub fn reverse_submatrix(mut grid: Vec<Vec<i32>>, x: i32, y: i32, k: i32) -> Vec<Vec<i32>> {
        // Two pointers walk inward from the square's top and bottom rows;
        // each step exchanges the k columns the square spans. A middle row
        // of an odd-sided square pairs with itself and needs no work.
        let (x, y, k) = (x as usize, y as usize, k as usize);
        let mut top = x;
        let mut bottom = x + k - 1;
        while top < bottom {
            for j in y..y + k {
                let tmp = grid[top][j];
                grid[top][j] = grid[bottom][j];
                grid[bottom][j] = tmp;
            }
            top += 1;
            bottom -= 1;
        }
        grid
    }
}
