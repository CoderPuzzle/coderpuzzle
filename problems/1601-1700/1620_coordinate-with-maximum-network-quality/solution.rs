impl Solution {
    pub fn best_coordinate(towers: Vec<Vec<i32>>, radius: i32) -> Vec<i32> {
        let mut best_x = 0;
        let mut best_y = 0;
        let mut best_quality: i64 = -1;

        for x in 0..=50 {
            for y in 0..=50 {
                let mut total: i64 = 0;
                for tower in &towers {
                    let dx = (tower[0] - x) as f64;
                    let dy = (tower[1] - y) as f64;
                    let d = (dx * dx + dy * dy).sqrt();
                    if d <= radius as f64 {
                        total += (tower[2] as f64 / (1.0 + d)).floor() as i64;
                    }
                }
                if total > best_quality {
                    best_quality = total;
                    best_x = x;
                    best_y = y;
                }
            }
        }

        vec![best_x, best_y]
    }
}
