use std::collections::BTreeSet;

impl Solution {
    // Enumerate every (center, k) rhombus by walking its four edges;
    // keep distinct sums and return the three largest.
    pub fn get_biggest_three(grid: Vec<Vec<i32>>) -> Vec<i64> {
        let m = grid.len();
        let n = grid[0].len();
        let mut sums: BTreeSet<i64> = BTreeSet::new();
        for r in 0..m {
            for c in 0..n {
                let mut k = 0usize;
                loop {
                    if r < k || r + k >= m || c < k || c + k >= n {
                        break;
                    }
                    let rk = k as isize;
                    let ck = k as isize;
                    let rr = r as isize;
                    let cc = c as isize;
                    let gi = |y: isize, x: isize| grid[y as usize][x as usize] as i64;
                    let mut total;
                    if k == 0 {
                        total = gi(rr, cc);
                    } else {
                        total = 0;
                        for i in 0..k {
                            let ii = i as isize;
                            total += gi(rr - rk + ii, cc - ii);
                            total += gi(rr + ii, cc - ck + ii);
                            total += gi(rr + rk - ii, cc + ii);
                            total += gi(rr - ii, cc + ck - ii);
                        }
                    }
                    sums.insert(total);
                    k += 1;
                }
            }
        }
        sums.iter().rev().take(3).copied().collect()
    }
}
