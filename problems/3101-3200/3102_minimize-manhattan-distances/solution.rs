impl Solution {
    pub fn minimum_distance(points: Vec<Vec<i32>>) -> i32 {
        let n = points.len();
        // Rotated coordinates u = x + y, v = x - y turn Manhattan
        // distance into max(|du|, |dv|); each axis then only needs its
        // extremes. With coordinates up to 1e8 the widest spread stays
        // below 4e8, safely inside an i32.
        let u: Vec<i32> = points.iter().map(|p| p[0] + p[1]).collect();
        let v: Vec<i32> = points.iter().map(|p| p[0] - p[1]).collect();
        let mut order_u: Vec<usize> = (0..n).collect();
        order_u.sort_by_key(|&i| u[i]);
        let mut order_v: Vec<usize> = (0..n).collect();
        order_v.sort_by_key(|&i| v[i]);
        let mut best = i32::MAX;
        for removed in 0..n {
            let lo_u = if order_u[0] == removed { order_u[1] } else { order_u[0] };
            let hi_u = if order_u[n - 1] == removed {
                order_u[n - 2]
            } else {
                order_u[n - 1]
            };
            let lo_v = if order_v[0] == removed { order_v[1] } else { order_v[0] };
            let hi_v = if order_v[n - 1] == removed {
                order_v[n - 2]
            } else {
                order_v[n - 1]
            };
            best = best.min((u[hi_u] - u[lo_u]).max(v[hi_v] - v[lo_v]));
        }
        best
    }
}
