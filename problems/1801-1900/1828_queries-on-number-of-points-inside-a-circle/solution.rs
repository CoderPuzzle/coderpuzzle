impl Solution {
    // A point lies in the circle exactly when its squared euclidean
    // distance to the center is at most r*r. Squaring keeps everything
    // in integers (values stay below 2*500*500), so border points are
    // judged exactly where sqrt rounding could misclassify them.
    pub fn count_points(points: Vec<Vec<i32>>, queries: Vec<Vec<i32>>) -> Vec<i32> {
        let mut answer = Vec::with_capacity(queries.len());
        for q in &queries {
            let (xj, yj, rr) = (q[0], q[1], q[2] * q[2]);
            let mut count = 0;
            for p in &points {
                let (dx, dy) = (p[0] - xj, p[1] - yj);
                if dx * dx + dy * dy <= rr {
                    count += 1;
                }
            }
            answer.push(count);
        }
        answer
    }
}
