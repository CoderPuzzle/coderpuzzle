impl Solution {
    pub fn visible_points(points: Vec<Vec<i32>>, angle: i32, location: Vec<i32>) -> i32 {
        let (posx, posy) = (location[0], location[1]);
        let mut same = 0;
        let mut degrees: Vec<f64> = Vec::new();
        for p in &points {
            let (x, y) = (p[0], p[1]);
            if x == posx && y == posy {
                same += 1;
            } else {
                let dy = (y - posy) as f64;
                let dx = (x - posx) as f64;
                let mut deg = dy.atan2(dx) * 180.0 / std::f64::consts::PI;
                if deg < 0.0 {
                    deg += 360.0;
                }
                degrees.push(deg);
            }
        }

        degrees.sort_by(|a, b| a.partial_cmp(b).unwrap());
        let n = degrees.len();
        let mut doubled: Vec<f64> = degrees.clone();
        for d in &degrees {
            doubled.push(d + 360.0);
        }

        let eps = 1e-9;
        let mut best = 0usize;
        let mut left = 0usize;
        for right in 0..doubled.len() {
            while doubled[right] - doubled[left] > angle as f64 + eps {
                left += 1;
            }
            let window = (right - left + 1).min(n);
            if window > best {
                best = window;
            }
        }

        same + best as i32
    }
}
