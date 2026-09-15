impl Solution {
    pub fn leftmost_building_queries(heights: Vec<i32>, queries: Vec<Vec<i32>>) -> Vec<i32> {
        let n = heights.len();
        // Max segment tree over heights, padded to a power of two: leaves hold
        // heights, each parent the max of its children.
        let mut size = 1usize;
        while size < n {
            size <<= 1;
        }
        let mut seg = vec![0i64; 2 * size];
        for i in 0..n {
            seg[size + i] = heights[i] as i64;
        }
        let mut i = size as isize - 1;
        while i >= 1 {
            seg[i as usize] = seg[(2 * i) as usize].max(seg[(2 * i + 1) as usize]);
            i -= 1;
        }

        let mut result: Vec<i32> = Vec::with_capacity(queries.len());
        // Movements only go rightward and strictly upward in height.
        for qr in &queries {
            let (mut a, mut b) = (qr[0] as usize, qr[1] as usize);
            if a > b {
                std::mem::swap(&mut a, &mut b);
            }
            if a == b {
                result.push(a as i32);
            } else if heights[a] < heights[b] {
                result.push(b as i32);
            } else {
                // The taller building sets the bar both must clear strictly
                // right of b; find the leftmost one above it.
                let threshold = heights[a].max(heights[b]) as i64;
                result.push(Self::find_first(&seg, 1, 0, size, b + 1, n, threshold) as i32);
            }
        }
        result
    }

    // First index in [ql, qr) whose height exceeds threshold, or -1.
    fn find_first(seg: &[i64], node: usize, nl: usize, nr: usize, ql: usize, qr: usize, threshold: i64) -> isize {
        // Prune any node outside the query range or whose max cannot qualify.
        if nr <= ql || qr <= nl || seg[node] <= threshold {
            return -1;
        }
        if nr - nl == 1 {
            return nl as isize;
        }
        let mid = (nl + nr) / 2;
        // Left child first, so the first leaf reached is the leftmost hit.
        let res = Self::find_first(seg, 2 * node, nl, mid, ql, qr, threshold);
        if res != -1 {
            return res;
        }
        Self::find_first(seg, 2 * node + 1, mid, nr, ql, qr, threshold)
    }
}
