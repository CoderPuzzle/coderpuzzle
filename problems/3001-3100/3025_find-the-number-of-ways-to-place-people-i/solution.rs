impl Solution {
    pub fn number_of_pairs(points: Vec<Vec<i32>>) -> i32 {
        let mut points = points;
        // Sorting by x ascending, y descending puts both ends of every valid
        // pair in a fixed order: each anchor's partners come strictly later
        // in the array.
        points.sort_by(|a, b| a[0].cmp(&b[0]).then(b[1].cmp(&a[1])));
        let mut total = 0;
        for i in 0..points.len() {
            let yi = points[i][1];
            // Every point already scanned between i and j has its x inside
            // the pair's span, so only the vertical window matters: best is
            // the largest y accepted so far, and yi >= yj > best holds
            // exactly when no other point lies in the closed rectangle —
            // rejected points are dominated by some accepted one, accepted
            // points are themselves inside it. Equal coordinates count as
            // on-the-line pairs; the border blocks everyone else.
            let mut best = -1; // coordinates are >= 0, so -1 is below everything
            for j in i + 1..points.len() {
                let yj = points[j][1];
                if yi >= yj && yj > best {
                    total += 1;
                    best = yj;
                }
            }
        }
        total
    }
}
