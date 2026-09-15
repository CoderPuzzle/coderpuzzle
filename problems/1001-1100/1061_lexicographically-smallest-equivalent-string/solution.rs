impl Solution {
    pub fn smallest_equivalent_string(s1: String, s2: String, base_str: String) -> String {
        let mut parent: [usize; 26] = [0; 26];
        for i in 0..26 {
            parent[i] = i;
        }
        // Path halving: re-point each visited node at its grandparent so the
        // trees flatten as we walk.
        fn find(parent: &mut [usize; 26], a: usize) -> usize {
            let mut a = a;
            while parent[a] != a {
                parent[a] = parent[parent[a]];
                a = parent[a];
            }
            a
        }
        let b1 = s1.as_bytes();
        let b2 = s2.as_bytes();
        for i in 0..b1.len() {
            let mut ra = find(&mut parent, (b1[i] - b'a') as usize);
            let mut rb = find(&mut parent, (b2[i] - b'a') as usize);
            if ra != rb {
                // The union rule encodes the answer: always attach the larger
                // root under the smaller one, so a component's root is its
                // lexicographically smallest letter.
                if rb < ra {
                    std::mem::swap(&mut ra, &mut rb);
                }
                parent[rb] = ra;
            }
        }
        // Each character maps to its component root — the smallest equivalent
        // letter (singletons map to themselves).
        let base = base_str.as_bytes();
        let mut out = String::with_capacity(base.len());
        for &c in base {
            out.push((b'a' + find(&mut parent, (c - b'a') as usize) as u8) as char);
        }
        out
    }
}
