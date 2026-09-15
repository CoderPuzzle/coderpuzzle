impl Solution {
    // Height never matters -- a rectangle's top may rise arbitrarily, so
    // its reach is just the x-interval [start, start + w]. Sorting the x
    // coordinates reduces the task to packing them into the fewest
    // windows of width w: plant a window at the first uncovered point,
    // drop everything it reaches, repeat.
    pub fn min_rectangles_to_cover_points(points: Vec<Vec<i32>>, w: i32) -> i32 {
        let mut xs: Vec<i32> = points.iter().map(|p| p[0]).collect();
        xs.sort_unstable();
        let mut count = 1;
        let mut anchor = xs[0];
        for &x in &xs[1..] {
            if x - anchor > w {
                count += 1;
                anchor = x;
            }
        }
        count
    }
}
