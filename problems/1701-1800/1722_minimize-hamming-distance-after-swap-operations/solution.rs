use std::collections::HashMap;

impl Solution {
    pub fn minimum_hamming_distance(source: Vec<i32>, target: Vec<i32>, allowed_swaps: Vec<Vec<i32>>) -> i32 {
        let n = source.len();
        let mut parent: Vec<usize> = (0..n).collect();

        fn find(parent: &mut Vec<usize>, mut x: usize) -> usize {
            while parent[x] != x {
                parent[x] = parent[parent[x]];
                x = parent[x];
            }
            x
        }

        // Swaps chain into connected components where values can be
        // permuted arbitrarily, and values never leave their component.
        for swap in &allowed_swaps {
            let ra = find(&mut parent, swap[0] as usize);
            let rb = find(&mut parent, swap[1] as usize);
            if ra != rb {
                parent[ra] = rb;
            }
        }

        let mut groups: HashMap<usize, Vec<usize>> = HashMap::new();
        for i in 0..n {
            groups.entry(find(&mut parent, i)).or_default().push(i);
        }

        // Per component, match target values against the multiset of
        // source values; each unmatched target must stay different.
        let mut distance = 0i32;
        for members in groups.values() {
            let mut have: HashMap<i32, i32> = HashMap::new();
            for &i in members {
                *have.entry(source[i]).or_insert(0) += 1;
            }
            for &i in members {
                let v = target[i];
                let c = *have.get(&v).unwrap_or(&0);
                if c > 0 {
                    have.insert(v, c - 1);
                } else {
                    distance += 1;
                }
            }
        }
        distance
    }
}
