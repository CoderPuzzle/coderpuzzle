impl Solution {
    pub fn min_swaps(grid: Vec<Vec<i32>>) -> i32 {
        let n = grid.len();

        fn trailing_zeros(row: &[i32]) -> i32 {
            let mut count = 0;
            for &value in row.iter().rev() {
                if value != 0 {
                    break;
                }
                count += 1;
            }
            count
        }

        let mut zeros: Vec<i32> = grid.iter().map(|row| trailing_zeros(row)).collect();

        let mut swaps = 0;
        for i in 0..n {
            let needed = (n - i - 1) as i32;
            if zeros[i] >= needed {
                continue;
            }
            let mut j = i + 1;
            while j < n && zeros[j] < needed {
                j += 1;
            }
            if j == n {
                return -1;
            }
            while j > i {
                zeros.swap(j, j - 1);
                j -= 1;
                swaps += 1;
            }
        }
        swaps
    }
}
