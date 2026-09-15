impl Solution {
    pub fn min_swaps_couples(row: Vec<i32>) -> i32 {
        let n = row.len();
        let mut pos: Vec<usize> = vec![0; n];
        for (i, &value) in row.iter().enumerate() {
            pos[value as usize] = i;
        }

        let slots = n / 2;
        let mut parent: Vec<usize> = (0..slots).collect();
        let mut size: Vec<usize> = vec![1; slots];

        fn find(parent: &mut [usize], mut a: usize) -> usize {
            let mut root = a;
            while parent[root] != root {
                root = parent[root];
            }
            while parent[a] != root {
                // path compression: point every visited node at the root
                let next = parent[a];
                parent[a] = root;
                a = next;
            }
            root
        }

        let mut groups = slots;
        for v in (0..n).step_by(2) {
            // each partner pair (v, v ^ 1) links its two slots
            let a = find(&mut parent, pos[v] / 2);
            let b = find(&mut parent, pos[v ^ 1] / 2);
            if a == b {
                continue;
            }
            if size[a] < size[b] {
                // union by size: hang the smaller tree under the larger
                parent[a] = b;
                size[b] += size[a];
            } else {
                parent[b] = a;
                size[a] += size[b];
            }
            groups -= 1;
        }
        (slots - groups) as i32
    }
}
