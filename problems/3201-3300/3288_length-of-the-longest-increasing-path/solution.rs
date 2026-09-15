impl Solution {
    pub fn max_path_length(coordinates: Vec<Vec<i32>>, k: i32) -> i32 {
        let pivot_x = coordinates[k as usize][0];
        let pivot_y = coordinates[k as usize][1];
        let mut below: Vec<(i32, i32)> = Vec::new();
        let mut above: Vec<(i32, i32)> = Vec::new();
        for point in &coordinates {
            if point[0] < pivot_x && point[1] < pivot_y {
                below.push((point[0], point[1]));
            } else if point[0] > pivot_x && point[1] > pivot_y {
                above.push((point[0], point[1]));
            }
        }
        1 + longest_chain(&mut below) + longest_chain(&mut above)
    }
}

fn longest_chain(points: &mut Vec<(i32, i32)>) -> i32 {
    points.sort_unstable_by(|a, b| if a.0 != b.0 { a.0.cmp(&b.0) } else { b.1.cmp(&a.1) });
    let mut tails: Vec<i32> = Vec::with_capacity(points.len());
    for (_, y) in points.iter() {
        let slot = tails.partition_point(|tail| *tail < *y);
        if slot == tails.len() {
            tails.push(*y);
        } else {
            tails[slot] = *y;
        }
    }
    tails.len() as i32
}
