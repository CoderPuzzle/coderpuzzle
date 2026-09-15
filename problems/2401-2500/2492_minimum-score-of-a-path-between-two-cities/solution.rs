impl Solution {
    pub fn min_score(n: i32, roads: Vec<Vec<i32>>) -> i32 {
        // A path may reuse roads, so any road inside the connected
        // component of city 1 can be crossed on a detour and included in
        // the path's score. The answer is therefore the smallest distance
        // among the roads of that component. Union every road, then scan
        // for the minimum road fully inside city 1's component.
        let n = n as usize;
        let mut parent: Vec<usize> = (0..=n).collect();
        for r in &roads {
            Self::unite(&mut parent, r[0] as usize, r[1] as usize);
        }
        let root = Self::find(&mut parent, 1);
        let mut best = 1_000_000_000;
        for r in &roads {
            if Self::find(&mut parent, r[0] as usize) == root && r[2] < best {
                best = r[2];
            }
        }
        best
    }

    fn find(parent: &mut Vec<usize>, x: usize) -> usize {
        let mut x = x;
        while parent[x] != x {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        x
    }

    fn unite(parent: &mut Vec<usize>, a: usize, b: usize) {
        let ra = Self::find(parent, a);
        let rb = Self::find(parent, b);
        if ra != rb {
            parent[ra] = rb;
        }
    }
}
