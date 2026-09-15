impl Solution {
    pub fn min_operations(nums: Vec<i32>, k: i32, queries: Vec<Vec<i32>>) -> Vec<i64> {
        let n = nums.len();
        // Remainder runs: a window is equalizable iff it sits inside one
        // maximal run of equal remainders, i.e. iff l and r share a mark.
        let mut run = vec![0i32; n];
        for i in 1..n {
            run[i] = run[i - 1] + if nums[i] % k != nums[i - 1] % k { 1 } else { 0 };
        }
        let quot: Vec<i64> = nums.iter().map(|&v| (v / k) as i64).collect();
        // Merge sort tree over the quotients: each node keeps its values
        // sorted plus prefix sums of that order.
        let mut sorted_nodes: Vec<Vec<i64>> = vec![Vec::new(); 4 * n];
        let mut prefix_nodes: Vec<Vec<i64>> = vec![Vec::new(); 4 * n];
        fn build(
            node: usize,
            lo: usize,
            hi: usize,
            quot: &[i64],
            sorted_nodes: &mut Vec<Vec<i64>>,
            prefix_nodes: &mut Vec<Vec<i64>>,
        ) {
            if lo == hi {
                sorted_nodes[node] = vec![quot[lo]];
                prefix_nodes[node] = vec![0, quot[lo]];
                return;
            }
            let mid = (lo + hi) / 2;
            build(2 * node, lo, mid, quot, sorted_nodes, prefix_nodes);
            build(2 * node + 1, mid + 1, hi, quot, sorted_nodes, prefix_nodes);
            let mut merged = Vec::with_capacity(sorted_nodes[2 * node].len() + sorted_nodes[2 * node + 1].len());
            merged.extend_from_slice(&sorted_nodes[2 * node]);
            merged.extend_from_slice(&sorted_nodes[2 * node + 1]);
            merged.sort_unstable();
            let mut pref = Vec::with_capacity(merged.len() + 1);
            pref.push(0i64);
            for value in &merged {
                pref.push(pref[pref.len() - 1] + value);
            }
            sorted_nodes[node] = merged;
            prefix_nodes[node] = pref;
        }
        build(1, 0, n - 1, &quot, &mut sorted_nodes, &mut prefix_nodes);

        struct Piece<'a> {
            vec: &'a [i64],
            pref: &'a [i64],
        }
        let count_le_sum = |pieces: &[Piece], x: i64| -> (i64, i64) {
            let mut count = 0i64;
            let mut total = 0i64;
            for piece in pieces {
                let cut = piece.vec.partition_point(|&value| value <= x);
                count += cut as i64;
                total += piece.pref[cut];
            }
            (count, total)
        };

        let mut result = Vec::with_capacity(queries.len());
        for query in &queries {
            let (l, r) = (query[0] as usize, query[1] as usize);
            if run[l] != run[r] {
                result.push(-1);
                continue;
            }
            // Decompose the window into tree nodes; the set stays fixed
            // for the whole query.
            let mut pieces: Vec<Piece> = Vec::new();
            let mut stack: Vec<(usize, usize, usize)> = vec![(1, 0, n - 1)];
            while let Some((node, lo, hi)) = stack.pop() {
                if r < lo || hi < l {
                    continue;
                }
                if l <= lo && hi <= r {
                    pieces.push(Piece {
                        vec: &sorted_nodes[node],
                        pref: &prefix_nodes[node],
                    });
                    continue;
                }
                let mid = (lo + hi) / 2;
                stack.push((2 * node, lo, mid));
                stack.push((2 * node + 1, mid + 1, hi));
            }
            // Smallest quotient whose inclusive rank reaches the lower
            // median; the decomposition's node set is fixed throughout.
            let need = ((r - l + 2) / 2) as i64;
            let mut lo = pieces.iter().map(|p| p.vec[0]).min().unwrap();
            let mut hi = pieces.iter().map(|p| p.vec[p.vec.len() - 1]).max().unwrap();
            while lo < hi {
                let mid = lo + (hi - lo) / 2;
                let (count, _) = count_le_sum(&pieces, mid);
                if count >= need {
                    hi = mid;
                } else {
                    lo = mid + 1;
                }
            }
            let median = lo;
            let size = (r - l + 1) as i64;
            let (at_count, at_sum) = count_le_sum(&pieces, median);
            let (below_count, below_sum) = count_le_sum(&pieces, median - 1);
            let grand_total: i64 = pieces.iter().map(|p| p.pref[p.pref.len() - 1]).sum();
            // Below-median elements climb by their shortfall; above-median
            // ones descend by their excess; equals cost nothing.
            result.push(median * below_count - below_sum + ((grand_total - at_sum) - median * (size - at_count)));
        }
        result
    }
}
