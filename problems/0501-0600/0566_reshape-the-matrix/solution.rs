impl Solution {
    pub fn matrix_reshape(mat: Vec<Vec<i32>>, r: i32, c: i32) -> Vec<Vec<i32>> {
        // A reshape can only permute elements, never create or destroy them,
        // so the target is legal exactly when the areas agree; any mismatch
        // returns the original matrix untouched.
        let m = mat.len() as i32;
        let n = mat[0].len() as i32;
        if r * c != m * n {
            return mat;
        }
        let mut reshaped = vec![vec![0; c as usize]; r as usize];
        // One flat index drives both sides: element i sits at mat[i / n][i % n]
        // in the source and belongs at reshaped[i / c][i % c] in the target,
        // so reading i = 0 .. m*n - 1 fills the target in row-traversing order.
        for i in 0..m * n {
            reshaped[(i / c) as usize][(i % c) as usize] = mat[(i / n) as usize][(i % n) as usize];
        }
        reshaped
    }
}
