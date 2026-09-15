impl Solution {
    pub fn internal_angles(sides: Vec<i32>) -> Vec<f64> {
        let mut ordered = sides;
        ordered.sort_unstable();
        if ordered[0] + ordered[1] <= ordered[2] {
            return Vec::new();
        }

        let mut result = Vec::with_capacity(3);
        for i in 0..3 {
            let opposite = ordered[i] as f64;
            let adjacent1 = ordered[(i + 1) % 3] as f64;
            let adjacent2 = ordered[(i + 2) % 3] as f64;
            let cosine =
                (adjacent1 * adjacent1 + adjacent2 * adjacent2 - opposite * opposite) / (2.0 * adjacent1 * adjacent2);
            let angle = cosine.clamp(-1.0, 1.0).acos().to_degrees();
            result.push((angle * 100000.0).round() / 100000.0);
        }
        result
    }
}
