impl Solution {
    pub fn are_connected(n: i32, threshold: i32, queries: Vec<Vec<i32>>) -> Vec<bool> {
        let n = n as usize;
        let mut parent: Vec<usize> = (0..=n).collect();

        fn find(parent: &mut Vec<usize>, x: usize) -> usize {
            let mut x = x;
            while parent[x] != x {
                parent[x] = parent[parent[x]];
                x = parent[x];
            }
            x
        }

        fn union(parent: &mut Vec<usize>, a: usize, b: usize) {
            let ra = find(parent, a);
            let rb = find(parent, b);
            if ra != rb {
                parent[ra] = rb;
            }
        }

        let threshold = threshold as usize;
        for z in (threshold + 1)..=n {
            if z > 1 && find(&mut parent, z) != z {
                continue;
            }
            let mut multiple = 2 * z;
            while multiple <= n {
                union(&mut parent, z, multiple);
                multiple += z;
            }
        }

        queries
            .iter()
            .map(|q| find(&mut parent, q[0] as usize) == find(&mut parent, q[1] as usize))
            .collect()
    }
}
