impl Solution {
    // Compare diagonals through their squares (l^2 + w^2): squares order
    // diagonals identically and stay exact in integers, so no square
    // roots or float rounding anywhere. Ties on the diagonal fall
    // through to the larger area.
    pub fn area_of_max_diagonal(dimensions: Vec<Vec<i32>>) -> i32 {
        let mut best_diag = 0;
        let mut best_area = 0;
        for rect in &dimensions {
            let diag = rect[0] * rect[0] + rect[1] * rect[1];
            let area = rect[0] * rect[1];
            if diag > best_diag || (diag == best_diag && area > best_area) {
                best_diag = diag;
                best_area = area;
            }
        }
        best_area
    }
}
