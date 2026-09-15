impl Solution {
    pub fn min_falling_path_sum(grid: Vec<Vec<i32>>) -> i32 {
        let n = grid.len();
        let mut prev: Vec<i32> = grid[0].clone();
        for i in 1..n {
            let mut min1 = i32::MAX;
            let mut min2 = i32::MAX;
            let mut idx1: usize = usize::MAX;
            for (j, &v) in prev.iter().enumerate() {
                if v < min1 {
                    min2 = min1;
                    min1 = v;
                    idx1 = j;
                } else if v < min2 {
                    min2 = v;
                }
            }
            let mut cur = vec![0i32; n];
            for j in 0..n {
                let best = if j == idx1 { min2 } else { min1 };
                cur[j] = grid[i][j] + best;
            }
            prev = cur;
        }
        *prev.iter().min().unwrap()
    }
}
