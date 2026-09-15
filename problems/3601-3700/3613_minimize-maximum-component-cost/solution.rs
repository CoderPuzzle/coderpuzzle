impl Solution {
    pub fn min_cost(n: i32, edges: Vec<Vec<i32>>, k: i32) -> i32 {
        let n = n as usize;
        // k >= n lets every node sit alone: no cut is ever needed.
        if k >= n as i32 {
            return 0;
        }

        let feasible = |t: i32| -> bool {
            let mut parent: Vec<usize> = (0..n).collect();
            // Keep only edges of weight <= t: the union-find then holds exactly
            // the components left after cutting every heavier edge, and any
            // further removal only increases the count, so t works iff <= k.
            let mut comps = n as i32;
            for e in &edges {
                if e[2] <= t {
                    let ru = find(&mut parent, e[0] as usize);
                    let rv = find(&mut parent, e[1] as usize);
                    if ru != rv {
                        parent[ru] = rv;
                        comps -= 1;
                    }
                }
            }
            comps <= k
        };

        // Weights are >= 1, so t = 0 keeps no edges; if even the edgeless
        // split fits in k parts, nothing needs cutting.
        if feasible(0) {
            return 0;
        }
        // Feasibility is monotone in t and only changes at edge weights, so
        // binary search the sorted distinct weights for the smallest feasible.
        let mut weights: Vec<i32> = edges.iter().map(|e| e[2]).collect();
        weights.sort();
        weights.dedup();
        let (mut lo, mut hi) = (0usize, weights.len() - 1);
        while lo < hi {
            let mid = lo + (hi - lo) / 2;
            if feasible(weights[mid]) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        weights[lo]
    }
}

fn find(parent: &mut Vec<usize>, mut x: usize) -> usize {
    while parent[x] != x {
        parent[x] = parent[parent[x]];
        x = parent[x];
    }
    x
}
