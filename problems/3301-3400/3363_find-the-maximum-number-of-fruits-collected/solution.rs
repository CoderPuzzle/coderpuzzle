fn triangle(m: &Vec<Vec<i32>>, swapped: bool) -> i64 {
    // Best walk from the top-right corner, one row per step, staying
    // strictly right of the diagonal, final cell excluded (-1 marks
    // not-yet-reachable cells; values >= 0).
    let n = m.len();
    let mut prev = vec![-1i64; n];
    prev[n - 1] = if swapped {
        m[n - 1][0] as i64
    } else {
        m[0][n - 1] as i64
    };
    for i in 1..n - 1 {
        let mut cur = vec![-1i64; n];
        for j in i + 1..n {
            let mut best = prev[j - 1];
            if prev[j] > best {
                best = prev[j];
            }
            if j + 1 < n && prev[j + 1] > best {
                best = prev[j + 1];
            }
            if best >= 0 {
                let v = (if swapped { m[j][i] } else { m[i][j] }) as i64;
                cur[j] = best + v;
            }
        }
        prev = cur;
    }
    prev[n - 1]
}

impl Solution {
    // Child 1 is pinned to the main diagonal. Children 2 and 3 each
    // walk their own off-diagonal triangle in n-1 steps (their row /
    // column advances one per move, and the diagonal can only be
    // touched by spending every later move on it, which collects
    // nothing), so solve them independently; diagonal cells and the
    // shared final cell are counted once, via the diagonal. Child 3 is
    // child 2 with the grid transposed (swapped reads).
    pub fn max_collected_fruits(fruits: Vec<Vec<i32>>) -> i64 {
        let n = fruits.len();
        let mut total: i64 = (0..n).map(|i| fruits[i][i] as i64).sum();
        total += triangle(&fruits, false);
        total += triangle(&fruits, true);
        total
    }
}
