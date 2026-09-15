impl Solution {
    pub fn max_sum_submatrix(matrix: Vec<Vec<i32>>, k: i32) -> i32 {
        let m = matrix.len();
        let n = matrix[0].len();
        // prefix[r][c] = sum of the r x c rectangle in the top-left corner;
        // any block is four lookups against this table.
        let mut prefix: Vec<Vec<i32>> = vec![vec![0; n + 1]; m + 1];
        for r in 1..=m {
            for c in 1..=n {
                prefix[r][c] = prefix[r - 1][c] + prefix[r][c - 1] - prefix[r - 1][c - 1] + matrix[r - 1][c - 1];
            }
        }
        // Walk every block by its four corner coordinates and keep the
        // largest total that respects the cap.
        let mut best = i32::MIN;
        for top in 0..m {
            for bottom in top..m {
                for left in 0..n {
                    let pt = &prefix[top];
                    let pb = &prefix[bottom + 1];
                    for right in left..n {
                        let total = pb[right + 1] - pt[right + 1] - pb[left] + pt[left];
                        if total <= k && total > best {
                            best = total;
                        }
                    }
                }
            }
        }
        best
    }
}
