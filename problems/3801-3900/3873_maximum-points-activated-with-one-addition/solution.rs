use std::collections::HashMap;

impl Solution {
    // Union every pair of points sharing an x or a y coordinate; the
    // activation closure of any point is its component, and a new point
    // touches at most two components, so join the two largest (or all, when
    // there is a single component).
    pub fn max_activated(points: Vec<Vec<i32>>) -> i32 {
        let n = points.len();
        let mut parent: Vec<usize> = (0..n).collect();
        let mut size = vec![1usize; n];

        fn find(parent: &mut [usize], mut x: usize) -> usize {
            while parent[x] != x {
                parent[x] = parent[parent[x]];
                x = parent[x];
            }
            x
        }
        fn unite(parent: &mut [usize], size: &mut [usize], a: usize, b: usize) {
            let (ra, rb) = (find(parent, a), find(parent, b));
            if ra == rb {
                return;
            }
            let (big, small) = if size[ra] < size[rb] { (rb, ra) } else { (ra, rb) };
            parent[small] = big;
            size[big] += size[small];
        }

        let mut xmap: HashMap<i32, usize> = HashMap::new();
        let mut ymap: HashMap<i32, usize> = HashMap::new();
        for i in 0..n {
            let x = points[i][0];
            let y = points[i][1];
            if let Some(&j) = xmap.get(&x) {
                unite(&mut parent, &mut size, i, j);
            } else {
                xmap.insert(x, i);
            }
            if let Some(&j) = ymap.get(&y) {
                unite(&mut parent, &mut size, i, j);
            } else {
                ymap.insert(y, i);
            }
        }

        let mut comp: HashMap<usize, usize> = HashMap::new();
        for i in 0..n {
            let r = find(&mut parent, i);
            *comp.entry(r).or_insert(0) += 1;
        }
        let mut sizes: Vec<usize> = comp.values().copied().collect();
        sizes.sort_by(|a, b| b.cmp(a));
        if sizes.len() == 1 {
            return n as i32 + 1;
        }
        (sizes[0] + sizes[1] + 1) as i32
    }
}
