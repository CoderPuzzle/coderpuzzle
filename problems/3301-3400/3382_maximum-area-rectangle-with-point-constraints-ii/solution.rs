impl Solution {
    // Sweep columns right-to-left. Compress both axes; a candidate
    // rectangle's left edge is two consecutive points (in y order) of one
    // column. The nearest column to the right holding any point with y in
    // [y1, y2] is the only possible right edge: any farther column would
    // keep that nearest point inside or on the border. A min segment tree
    // over compressed y, seeded with column indices as columns are passed,
    // answers "nearest column with a point in y-range [a, b]" as a
    // range-min query. The right column must hold exactly y1 and y2 inside
    // the range (both corners, nothing between or on the border).
    pub fn max_rectangle_area(x_coord: Vec<i32>, y_coord: Vec<i32>) -> i64 {
        let n = x_coord.len();
        let mut xs = x_coord.clone();
        xs.sort_unstable();
        xs.dedup();
        let mut ys = y_coord.clone();
        ys.sort_unstable();
        ys.dedup();
        let m = xs.len();
        let k = ys.len();
        let cx_of = |v: i32| xs.partition_point(|&x| x < v);
        let cy_of = |v: i32| ys.partition_point(|&y| y < v);
        let mut idx: Vec<usize> = (0..n).collect();
        idx.sort_by_key(|&i| (cx_of(x_coord[i]), cy_of(y_coord[i])));
        let mut cols: Vec<Vec<usize>> = Vec::new();
        let mut p = 0usize;
        while p < n {
            let mut q = p + 1;
            while q < n && cx_of(x_coord[idx[q]]) == cx_of(x_coord[idx[p]]) {
                q += 1;
            }
            cols.push((p..q).map(|t| cy_of(y_coord[idx[t]])).collect());
            p = q;
        }
        let mut size = 1usize;
        while size < k {
            size *= 2;
        }
        let inf = m as i32;
        let mut tree = vec![inf; 2 * size];
        let mut best: i64 = -1;
        for c in (0..m).rev() {
            let col = cols[c].clone();
            for t in 0..col.len() - 1 {
                let (a, b) = (col[t], col[t + 1]);
                let mut res = inf;
                let (mut l, mut r) = (a + size, b + size + 1);
                while l < r {
                    if l & 1 == 1 {
                        if tree[l] < res {
                            res = tree[l];
                        }
                        l += 1;
                    }
                    if r & 1 == 1 {
                        r -= 1;
                        if tree[r] < res {
                            res = tree[r];
                        }
                    }
                    l >>= 1;
                    r >>= 1;
                }
                if res < inf {
                    let rc = res as usize;
                    let arr = &cols[rc];
                    let lo = arr.partition_point(|&v| v < a);
                    let hi = arr.partition_point(|&v| v <= b);
                    if hi - lo == 2 && arr[lo] == a && arr[lo + 1] == b {
                        let area = ((xs[rc] - xs[c]) as i64) * ((ys[b] - ys[a]) as i64);
                        if area > best {
                            best = area;
                        }
                    }
                }
            }
            for &yy in &cols[c] {
                let val = c as i32;
                let mut i = yy + size;
                while i > 0 && tree[i] > val {
                    tree[i] = val;
                    i >>= 1;
                }
            }
        }
        best
    }
}
