impl Solution {
    pub fn max_trailing_zeros(grid: Vec<Vec<i32>>) -> i32 {
        let m = grid.len();
        let n = grid[0].len();

        let mut count2 = vec![vec![0i32; n]; m];
        let mut count5 = vec![vec![0i32; n]; m];
        for i in 0..m {
            for j in 0..n {
                let mut x = grid[i][j];
                while x % 2 == 0 {
                    x /= 2;
                    count2[i][j] += 1;
                }
                while x % 5 == 0 {
                    x /= 5;
                    count5[i][j] += 1;
                }
            }
        }

        // row2[i][j+1] = sum count2[i][0..j]; row5 analogous.
        let mut row2 = vec![vec![0i32; n + 1]; m];
        let mut row5 = vec![vec![0i32; n + 1]; m];
        for i in 0..m {
            for j in 0..n {
                row2[i][j + 1] = row2[i][j] + count2[i][j];
                row5[i][j + 1] = row5[i][j] + count5[i][j];
            }
        }

        // col2[j][i+1] = sum count2[0..i][j]; col5 analogous.
        let mut col2 = vec![vec![0i32; m + 1]; n];
        let mut col5 = vec![vec![0i32; m + 1]; n];
        for j in 0..n {
            for i in 0..m {
                col2[j][i + 1] = col2[j][i] + count2[i][j];
                col5[j][i + 1] = col5[j][i] + count5[i][j];
            }
        }

        let mut answer: i32 = 0;
        for i in 0..m {
            for j in 0..n {
                let cell2 = count2[i][j];
                let cell5 = count5[i][j];
                // horizontal sum over full row segment, vertical over full column segment
                let horiz2_left = row2[i][j + 1]; // cols [0, j]
                let horiz2_right = row2[i][n] - row2[i][j]; // cols [j, n-1]
                let vert2_top = col2[j][i + 1]; // rows [0, i]
                let vert2_bottom = col2[j][m] - col2[j][i]; // rows [i, m-1]
                let horiz5_left = row5[i][j + 1];
                let horiz5_right = row5[i][n] - row5[i][j];
                let vert5_top = col5[j][i + 1];
                let vert5_bottom = col5[j][m] - col5[j][i];

                answer = answer.max(
                    (horiz2_left + vert2_top - cell2)
                        .min(horiz5_left + vert5_top - cell5)
                        .max((horiz2_right + vert2_top - cell2).min(horiz5_right + vert5_top - cell5))
                        .max((horiz2_left + vert2_bottom - cell2).min(horiz5_left + vert5_bottom - cell5))
                        .max((horiz2_right + vert2_bottom - cell2).min(horiz5_right + vert5_bottom - cell5)),
                );
            }
        }
        answer
    }
}
