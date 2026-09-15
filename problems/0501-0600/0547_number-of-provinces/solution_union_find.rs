impl Solution {
    pub fn find_circle_num(is_connected: Vec<Vec<i32>>) -> i32 {
        // Path-halving: splice every other node directly under its
        // grandparent, flattening the tree while walking to the root.
        fn find(parent: &mut [usize], mut x: usize) -> usize {
            while parent[x] != x {
                parent[x] = parent[parent[x]];
                x = parent[x];
            }
            x
        }
        let n = is_connected.len();
        let mut parent: Vec<usize> = (0..n).collect();
        // Every city begins as its own province; only a
        // successful union ever reduces the count.
        let mut provinces = n as i32;
        // The matrix is symmetric, so scanning pairs i < j feeds every
        // road to the union exactly once; the diagonal is skipped.
        for i in 0..n {
            for j in (i + 1)..n {
                if is_connected[i][j] == 1 {
                    let ri = find(&mut parent, i);
                    let rj = find(&mut parent, j);
                    // A road joining two distinct roots merges two provinces;
                    // one whose cities already share a root is redundant.
                    if ri != rj {
                        parent[ri] = rj;
                        provinces -= 1;
                    }
                }
            }
        }
        provinces
    }
}
