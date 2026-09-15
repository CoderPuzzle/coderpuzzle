impl Solution {
    pub fn max_distance(position: Vec<i32>, m: i32) -> i32 {
        let position = {
            let mut pos = position;
            pos.sort();
            pos
        };

        let feasible = |distance: i32| -> bool {
            // Greedy: the first ball sits at the leftmost basket (count = 1),
            // then each ball takes the first basket at least `distance`
            // beyond the last placed one. Earliest-possible placement is
            // never worse, so failure here means no placement works.
            let mut count = 1;
            let mut last = position[0];
            for i in 1..position.len() {
                if position[i] - last >= distance {
                    count += 1;
                    last = position[i];
                    if count >= m {
                        // All balls placed — exit early.
                        return true;
                    }
                }
            }
            count >= m
        };

        // Feasibility is monotone in the spacing, so binary search the
        // largest feasible d over [1, span]; the upper-mid form keeps the
        // search moving when lo and hi become adjacent.
        let mut lo = 1;
        let mut hi = position[position.len() - 1] - position[0];
        while lo < hi {
            let mid = lo + (hi - lo + 1) / 2;
            if feasible(mid) {
                lo = mid;
            } else {
                hi = mid - 1;
            }
        }
        lo
    }
}
