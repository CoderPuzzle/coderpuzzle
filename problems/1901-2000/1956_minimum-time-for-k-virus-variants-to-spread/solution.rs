impl Solution {
    pub fn min_daysk_variants(points: Vec<Vec<i32>>, k: i32) -> i32 {
        // At day t a variant reaches exactly the L1 ball of radius t around
        // its origin, so the answer is min over every lattice point p of the
        // k-th smallest L1 distance from p to the n origins. Any point
        // outside the bounding box can be projected onto the box, which only
        // shrinks every distance, so the minimizer lies inside it. With
        // coordinates bounded by 100 the box has at most 100*100 points and
        // n <= 50, so sorting the n distances per point is cheap.
        let (mut min_x, mut max_x) = (i32::MAX, i32::MIN);
        let (mut min_y, mut max_y) = (i32::MAX, i32::MIN);
        for p in &points {
            min_x = min_x.min(p[0]);
            max_x = max_x.max(p[0]);
            min_y = min_y.min(p[1]);
            max_y = max_y.max(p[1]);
        }
        let mut best = i32::MAX;
        for x in min_x..=max_x {
            for y in min_y..=max_y {
                let mut dists: Vec<i32> = points.iter().map(|p| (x - p[0]).abs() + (y - p[1]).abs()).collect();
                dists.sort();
                best = best.min(dists[k as usize - 1]);
            }
        }
        best
    }
}
