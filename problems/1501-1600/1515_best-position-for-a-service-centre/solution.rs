impl Solution {
    pub fn get_min_dist_sum(positions: Vec<Vec<i32>>) -> f64 {
        let n = positions.len() as f64;
        // start from the centroid, a reasonable first guess for the median
        let mut x = positions.iter().map(|p| p[0] as f64).sum::<f64>() / n;
        let mut y = positions.iter().map(|p| p[1] as f64).sum::<f64>() / n;
        const EPS: f64 = 1e-9; // keeps the weight finite if the guess lands on a customer
        for _ in 0..300 {
            let mut num_x = 0.0f64;
            let mut num_y = 0.0f64;
            let mut weight_sum = 0.0f64;
            for p in &positions {
                let (px, py) = (p[0] as f64, p[1] as f64);
                let distance = (x - px).hypot(y - py) + EPS;
                let weight = 1.0 / distance;
                num_x += weight * px;
                num_y += weight * py;
                weight_sum += weight;
            }
            x = num_x / weight_sum;
            y = num_y / weight_sum;
        }
        positions.iter().map(|p| (x - p[0] as f64).hypot(y - p[1] as f64)).sum()
    }
}
