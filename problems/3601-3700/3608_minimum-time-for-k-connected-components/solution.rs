impl Solution {
    pub fn min_time(n: i32, edges: Vec<Vec<i32>>, k: i32) -> i32 {
        let n = n as usize;
        let k = k as i32;
        let mut parent: Vec<usize> = (0..n).collect();

        fn find(parent: &mut Vec<usize>, mut x: usize) -> usize {
            while parent[x] != x {
                parent[x] = parent[parent[x]];
                x = parent[x];
            }
            x
        }

        // Reverse Kruskal: sweep edges from longest-lived to shortest so the
        // union-find mirrors the graph with every edge of time <= t removed.
        let mut ordered = edges.clone();
        ordered.sort_by(|a, b| b[2].cmp(&a[2]));

        let mut components = n as i32;
        let mut answer: i32 = 0;
        let mut i = 0;
        let m = ordered.len();
        while i < m {
            let t = ordered[i][2];
            // Pre-merge state: every edge of time <= t is gone. If the count
            // already reaches k, t works; later overwrites keep the minimum.
            if components >= k {
                answer = t;
            }
            // Merge the whole equal-time group so a partially merged group is
            // never mistaken for a valid intermediate state.
            while i < m && ordered[i][2] == t {
                let u = ordered[i][0] as usize;
                let v = ordered[i][1] as usize;
                let ru = find(&mut parent, u);
                let rv = find(&mut parent, v);
                // A redundant edge (both ends already united) leaves the count alone.
                if ru != rv {
                    parent[ru] = rv;
                    components -= 1;
                }
                i += 1;
            }
        }
        // The full graph itself may already have >= k components: answer 0.
        if components >= k {
            answer = 0;
        }
        answer
    }
}
