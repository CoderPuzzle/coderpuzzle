impl Solution {
    pub fn maximum_coins(coins: Vec<Vec<i32>>, k: i32) -> i64 {
        let mut segments: Vec<(i64, i64, i64)> =
            coins.iter().map(|c| (c[0] as i64, c[1] as i64, c[2] as i64)).collect();
        segments.sort_by(|a, b| a.0.cmp(&b.0)); // stable
        let n = segments.len();
        let lefts: Vec<i64> = segments.iter().map(|s| s.0).collect();
        let rights: Vec<i64> = segments.iter().map(|s| s.1).collect();
        let cs: Vec<i64> = segments.iter().map(|s| s.2).collect();
        // Per-segment totals and prefix sums: any run of fully covered
        // segments sums in O(1).
        let area: Vec<i64> = (0..n).map(|i| cs[i] * (rights[i] - lefts[i] + 1)).collect();
        let mut prefix = vec![0i64; n + 1];
        for i in 0..n {
            prefix[i + 1] = prefix[i] + area[i];
        }

        let kk = k as i64;
        // Coins inside [start, start + k - 1]. `a` is the first segment whose
        // right end reaches the window; `b` the last whose left end falls
        // inside it.
        let window = |start: i64| -> i64 {
            let end = start + kk - 1;
            // bisect_left(rights, start)
            let a = rights.partition_point(|&x| x < start);
            // bisect_right(lefts, end) - 1
            let b = lefts.partition_point(|&x| x <= end) - 1;
            // No segment intersects the window.
            if a > b {
                return 0;
            }
            // Clip the two boundary segments to the window; the segments in
            // between are fully covered. Segments are disjoint, so clipping
            // both partial ends never double counts.
            let lo_a = lefts[a].max(start);
            let hi_a = rights[a].min(end);
            // Window meets only one segment: plain density * clipped length.
            if a == b {
                return if lo_a <= hi_a { cs[a] * (hi_a - lo_a + 1) } else { 0 };
            }
            let lo_b = lefts[b].max(start);
            let hi_b = rights[b].min(end);
            // Full run from the prefix sum, then swap each boundary segment's
            // full area for its clipped part.
            let mut total = prefix[b + 1] - prefix[a];
            total += cs[a] * (hi_a - lo_a + 1) - area[a];
            total += cs[b] * (hi_b - lo_b + 1) - area[b];
            total
        };

        // An optimal window can always slide until its left end meets some li
        // or its right end meets some ri, so these 2n starts cover the optimum.
        // rights[i] - k + 1 may be negative; positions before 1 simply hold
        // nothing and the binary searches handle them.
        let mut best: i64 = 0;
        for i in 0..n {
            for candidate in [lefts[i], rights[i] - kk + 1] {
                let value = window(candidate);
                if value > best {
                    best = value;
                }
            }
        }
        best
    }
}
