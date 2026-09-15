impl Solution {
    pub fn diagonal_sort(mat: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        // Cells on one diagonal share i - j, so sort each diagonal from its
        // top-row / left-column start and write the values back along the walk.
        let m = mat.len();
        let n = mat[0].len();
        let mut out = vec![vec![0i32; n]; m];
        let mut scatter = |out: &mut Vec<Vec<i32>>, si: usize, sj: usize| {
            let mut diag: Vec<i32> = Vec::new();
            let (mut i, mut j) = (si, sj);
            while i < m && j < n {
                diag.push(mat[i][j]);
                i += 1;
                j += 1;
            }
            diag.sort_unstable();
            let (mut i, mut j) = (si, sj);
            for value in diag {
                out[i][j] = value;
                i += 1;
                j += 1;
            }
        };
        for si in 0..m {
            scatter(&mut out, si, 0);
        }
        for sj in 1..n {
            scatter(&mut out, 0, sj);
        }
        out
    }
}
