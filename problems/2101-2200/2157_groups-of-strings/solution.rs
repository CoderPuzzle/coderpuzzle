use std::collections::HashMap;

impl Solution {
    pub fn group_strings(words: Vec<String>) -> Vec<i32> {
        let mut mask_counter: HashMap<i32, i32> = HashMap::new();
        for w in &words {
            let mut mask: i32 = 0;
            for &b in w.as_bytes() {
                mask |= 1 << (b - b'a') as i32;
            }
            *mask_counter.entry(mask).or_insert(0) += 1;
        }

        let masks: Vec<i32> = mask_counter.keys().copied().collect();
        let mut index: HashMap<i32, usize> = HashMap::new();
        for (k, &m) in masks.iter().enumerate() {
            index.insert(m, k);
        }
        let sz = masks.len();
        let mut parent: Vec<usize> = (0..sz).collect();
        let mut size_count: Vec<i32> = masks.iter().map(|&m| mask_counter[&m]).collect();

        fn find(parent: &mut Vec<usize>, mut x: usize) -> usize {
            while parent[x] != x {
                parent[x] = parent[parent[x]];
                x = parent[x];
            }
            x
        }

        fn union_idx(parent: &mut Vec<usize>, size_count: &mut Vec<i32>, a: usize, b: usize) {
            let ra = find(parent, a);
            let rb = find(parent, b);
            if ra != rb {
                parent[rb] = ra;
                size_count[ra] += size_count[rb];
            }
        }

        let full: i32 = (1 << 26) - 1;
        for k in 0..sz {
            let mask = masks[k];
            // Add / delete one letter: masks differing in exactly one bit.
            for bit in 0..26 {
                let neighbor = mask ^ (1 << bit);
                if let Some(&ni) = index.get(&neighbor) {
                    union_idx(&mut parent, &mut size_count, k, ni);
                }
            }
            // Replace one letter: remove a present bit, add an absent bit.
            let absent = full & !mask;
            let mut removable = mask;
            while removable != 0 {
                let low = removable & removable.wrapping_neg();
                removable ^= low;
                let base = mask & !low;
                let mut addable = absent;
                while addable != 0 {
                    let low2 = addable & addable.wrapping_neg();
                    addable ^= low2;
                    let neighbor = base | low2;
                    if let Some(&ni) = index.get(&neighbor) {
                        union_idx(&mut parent, &mut size_count, k, ni);
                    }
                }
            }
        }

        let mut roots = std::collections::HashSet::new();
        for k in 0..sz {
            roots.insert(find(&mut parent, k));
        }
        let mut largest = 0;
        for k in 0..sz {
            if find(&mut parent, k) == k {
                largest = largest.max(size_count[k]);
            }
        }
        vec![roots.len() as i32, largest]
    }
}
