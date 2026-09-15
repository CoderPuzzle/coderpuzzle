use std::collections::HashSet;

impl Solution {
    pub fn maximize_square_area(m: i64, n: i64, h_fences: Vec<i64>, v_fences: Vec<i64>) -> i64 {
        // Adding the immovable border fences at 1 and outer makes every
        // surviving region width a pairwise difference of the positions.
        // The square side is the largest gap present in both directions.
        let all_gaps = |outer: i64, fences: &Vec<i64>| -> HashSet<i64> {
            let mut xs = fences.clone();
            xs.push(1);
            xs.push(outer);
            xs.sort_unstable();
            let mut out = HashSet::new();
            for i in 0..xs.len() {
                for j in (i + 1)..xs.len() {
                    out.insert(xs[j] - xs[i]);
                }
            }
            out
        };
        let h_gaps = all_gaps(m, &h_fences);
        let best = all_gaps(n, &v_fences).into_iter().filter(|d| h_gaps.contains(d)).max();
        match best {
            None => -1,
            // best <= 10^9 - 1, so the square fits in 64 bits before the
            // modulo.
            Some(d) => d * d % 1_000_000_007,
        }
    }
}
