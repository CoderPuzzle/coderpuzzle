impl Solution {
    pub fn max_star_sum(vals: Vec<i32>, edges: Vec<Vec<i32>>, k: i32) -> i32 {
        let n = vals.len();
        let mut neighbors: Vec<Vec<i32>> = vec![Vec::new(); n];
        // Store neighbor values (not indices) while reading edges, so
        // each center later sees its candidates directly.
        for edge in &edges {
            let a = edge[0] as usize;
            let b = edge[1] as usize;
            neighbors[a].push(vals[b]);
            neighbors[b].push(vals[a]);
        }
        // The center alone is a legal star: seed with the best single
        // value, never 0, so all-negative inputs stay negative.
        let mut best = *vals.iter().max().unwrap();
        for i in 0..n {
            let adjacent = &mut neighbors[i];
            // For a fixed center the best subset is greedy: sorted
            // descending, take neighbors while they help.
            adjacent.sort_by(|x, y| y.cmp(x));
            let mut total = vals[i];
            let take = (k as usize).min(adjacent.len());
            for j in 0..take {
                // A non-positive neighbor can only lower the sum.
                if adjacent[j] <= 0 {
                    break;
                }
                total += adjacent[j];
            }
            if total > best {
                best = total;
            }
        }
        best
    }
}
