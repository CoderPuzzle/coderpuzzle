impl Solution {
    pub fn count_components(n: i32, edges: Vec<Vec<i32>>) -> i32 {
        // Path-halving: splice every other node directly under its
        // grandparent, flattening the tree while walking to the root.
        fn find(parent: &mut [usize], mut x: usize) -> usize {
            while parent[x] != x {
                parent[x] = parent[parent[x]];
                x = parent[x];
            }
            x
        }
        let n = n as usize;
        let mut parent: Vec<usize> = (0..n).collect();
        // Every node begins as its own component.
        let mut count = n as i32;
        for e in &edges {
            let ra = find(&mut parent, e[0] as usize);
            let rb = find(&mut parent, e[1] as usize);
            // An edge joining two distinct roots merges two components;
            // one whose endpoints already share a root is redundant.
            if ra != rb {
                parent[ra] = rb;
                count -= 1;
            }
        }
        count
    }
}
