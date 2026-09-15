impl Solution {
    pub fn num_similar_groups(strs: Vec<String>) -> i32 {
        // All words are mutual anagrams, so they are similar iff they
        // differ in 0 or 2 positions — exactly what one swap fixes;
        // bail on the third mismatch.
        fn similar(a: &[u8], b: &[u8]) -> bool {
            let mut mismatches = 0;
            for i in 0..a.len() {
                if a[i] != b[i] {
                    mismatches += 1;
                    if mismatches > 2 {
                        return false;
                    }
                }
            }
            mismatches == 0 || mismatches == 2
        }

        // Path halving keeps repeated lookups nearly constant.
        fn find(parent: &mut [usize], x: usize) -> usize {
            let mut x = x;
            while parent[x] != x {
                parent[x] = parent[parent[x]];
                x = parent[x];
            }
            x
        }

        let n = strs.len();
        let mut parent: Vec<usize> = (0..n).collect();

        // Union every similar pair: groups are the transitive closure,
        // so indirectly similar words share a root.
        for i in 0..n {
            for j in (i + 1)..n {
                if similar(strs[i].as_bytes(), strs[j].as_bytes()) {
                    let ri = find(&mut parent, i);
                    let rj = find(&mut parent, j);
                    if ri != rj {
                        parent[ri] = rj;
                    }
                }
            }
        }

        // The answer is the number of distinct roots remaining.
        let mut roots = std::collections::HashSet::new();
        for i in 0..n {
            roots.insert(find(&mut parent, i));
        }
        roots.len() as i32
    }
}
