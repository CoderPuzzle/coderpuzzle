impl Solution {
    pub fn count_lattice_points(circles: Vec<Vec<i32>>) -> i32 {
        let mut covered = [[false; 201]; 201];
        for circle in &circles {
            let (x, y, r) = (circle[0] as usize, circle[1] as usize, circle[2] as usize);
            for px in x - r..=x + r {
                for py in y - r..=y + r {
                    let dx = px as i64 - x as i64;
                    let dy = py as i64 - y as i64;
                    if dx * dx + dy * dy <= (r as i64) * (r as i64) {
                        covered[px][py] = true;
                    }
                }
            }
        }
        let mut count = 0;
        for row in &covered {
            for &cell in row {
                if cell {
                    count += 1;
                }
            }
        }
        count
    }
}
