impl Solution {
    pub fn find_critical_and_pseudo_critical_edges(n: i32, edges: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        let n = n as usize;
        let m = edges.len();

        // Sort edge indices by weight once; every per-edge test reuses this order.
        let mut order: Vec<usize> = (0..m).collect();
        order.sort_by_key(|&i| edges[i][2]);

        struct Dsu {
            par: Vec<usize>,
            sz: Vec<usize>,
        }
        impl Dsu {
            fn new(n: usize) -> Self {
                Dsu {
                    par: (0..n).collect(),
                    sz: vec![1; n],
                }
            }
            fn find(&mut self, mut x: usize) -> usize {
                while self.par[x] != x {
                    self.par[x] = self.par[self.par[x]];
                    x = self.par[x];
                }
                x
            }
            fn union(&mut self, a: usize, b: usize) -> bool {
                let mut a = self.find(a);
                let mut b = self.find(b);
                if a == b {
                    return false;
                }
                if self.sz[a] < self.sz[b] {
                    std::mem::swap(&mut a, &mut b);
                }
                self.par[b] = a;
                self.sz[a] += self.sz[b];
                true
            }
        }

        // base MST weight
        let mut base_weight: i64 = 0;
        {
            let mut dsu = Dsu::new(n);
            for &idx in &order {
                if dsu.union(edges[idx][0] as usize, edges[idx][1] as usize) {
                    base_weight += edges[idx][2] as i64;
                }
            }
        }

        // Kruskal skipping edge `skip` and/or forcing edge `force` in first.
        // Returns None when no spanning tree can be formed.
        let mst_weight = |skip: Option<usize>, force: Option<usize>| -> Option<i64> {
            let mut dsu = Dsu::new(n);
            let mut weight: i64 = 0;
            let mut used: usize = 0;
            if let Some(f) = force {
                dsu.union(edges[f][0] as usize, edges[f][1] as usize);
                weight += edges[f][2] as i64;
                used += 1;
            }
            for &idx in &order {
                if Some(idx) == skip {
                    continue;
                }
                if dsu.union(edges[idx][0] as usize, edges[idx][1] as usize) {
                    weight += edges[idx][2] as i64;
                    used += 1;
                }
            }
            if used == n - 1 {
                Some(weight)
            } else {
                None
            }
        };

        let mut critical: Vec<i32> = Vec::new();
        let mut pseudo: Vec<i32> = Vec::new();
        // Deletion raising the weight (or disconnecting, seen as None) marks
        // an edge critical; the forcing test runs only on survivors, because
        // a critical edge would also pass it.
        for i in 0..m {
            let without = mst_weight(Some(i), None);
            let is_worse = match without {
                Some(w) => w > base_weight,
                None => true,
            };
            if is_worse {
                critical.push(i as i32);
            } else if mst_weight(None, Some(i)) == Some(base_weight) {
                pseudo.push(i as i32);
            }
        }
        // loop ascends, so both lists are already sorted
        vec![critical, pseudo]
    }
}
