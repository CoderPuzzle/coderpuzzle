use std::collections::HashMap;

impl Solution {
    pub fn separate_squares(squares: Vec<Vec<i32>>) -> f64 {
        let n = squares.len();
        // compressed x-coordinates (square left and right edges)
        let mut xs: Vec<i64> = Vec::with_capacity(2 * n);
        for sq in &squares {
            xs.push(sq[0] as i64);
            xs.push(sq[0] as i64 + sq[2] as i64);
        }
        xs.sort_unstable();
        xs.dedup();
        let m = xs.len();
        let index: HashMap<i64, usize> = xs.iter().enumerate().map(|(i, &v)| (v, i)).collect();

        // y-sweep events: square bottom (+1) and top (-1)
        let mut events: Vec<(i64, i64, i64, i32)> = Vec::with_capacity(2 * n);
        for sq in &squares {
            let x = sq[0] as i64;
            let y = sq[1] as i64;
            let l = sq[2] as i64;
            events.push((y, x, x + l, 1));
            events.push((y + l, x, x + l, -1));
        }
        events.sort_unstable();

        fn update(
            xs: &[i64],
            count: &mut [i32],
            cover: &mut [i64],
            node: usize,
            lo: usize,
            hi: usize,
            i: usize,
            j: usize,
            delta: i32,
        ) {
            if j <= lo || hi <= i {
                return;
            }
            if i <= lo && hi <= j {
                count[node] += delta;
            } else {
                let mid = (lo + hi) / 2;
                update(xs, count, cover, 2 * node, lo, mid, i, j, delta);
                update(xs, count, cover, 2 * node + 1, mid, hi, i, j, delta);
            }
            if count[node] > 0 {
                cover[node] = xs[hi] - xs[lo];
            } else if hi - lo == 1 {
                cover[node] = 0;
            } else {
                cover[node] = cover[2 * node] + cover[2 * node + 1];
            }
        }

        let mut count = vec![0i32; 4 * m];
        let mut cover = vec![0i64; 4 * m];

        // Pass 1: record every positive-width band and accumulate the total
        // covered (union) area — exact integer arithmetic throughout.
        let mut bands: Vec<(i64, i64, i64, i64)> = Vec::new(); // (y0, y1, width, areaBefore)
        let mut total: i64 = 0;
        let mut k = 0;
        while k < events.len() {
            let y = events[k].0;
            while k < events.len() && events[k].0 == y {
                let (_, x1, x2, d) = events[k];
                update(&xs, &mut count, &mut cover, 1, 0, m - 1, index[&x1], index[&x2], d);
                k += 1;
            }
            if k < events.len() {
                let width = cover[1];
                if width > 0 {
                    let y1 = events[k].0;
                    bands.push((y, y1, width, total));
                    total += width * (y1 - y);
                }
            }
        }

        // Pass 2: the first band whose end reaches half of the total contains
        // the balance line; only here do we divide.
        let mut area: i64 = 0;
        for &(y0, y1, width, _) in &bands {
            let after = area + width * (y1 - y0);
            if 2 * after >= total {
                return y0 as f64 + (total - 2 * area) as f64 / (2.0 * width as f64);
            }
            area = after;
        }
        0.0 // unreachable: at least one square covers positive area
    }
}
