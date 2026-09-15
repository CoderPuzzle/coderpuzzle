impl Solution {
    pub fn k_closest(points: Vec<Vec<i32>>, k: i32) -> Vec<Vec<i32>> {
        let mut pts = points;
        // Squared distance ranks points identically to the Euclidean
        // distance (sqrt is monotone) while staying integer-exact.
        pts.sort_by_key(|p| p[0] * p[0] + p[1] * p[1]);
        pts.truncate(k as usize);
        pts
    }
}
