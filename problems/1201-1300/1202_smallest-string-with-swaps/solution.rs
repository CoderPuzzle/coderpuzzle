impl Solution {
    pub fn smallest_string_with_swaps(s: String, pairs: Vec<Vec<i32>>) -> String {
        let bytes = s.into_bytes();
        let n = bytes.len();
        let mut parent: Vec<usize> = (0..n).collect();

        fn find(parent: &mut Vec<usize>, mut x: usize) -> usize {
            // path halving keeps the trees shallow
            while parent[x] != x {
                parent[x] = parent[parent[x]];
                x = parent[x];
            }
            x
        }

        // chained swaps let any two indices in one component exchange, so a
        // component's character multiset is fixed but freely permutable
        for pair in &pairs {
            let ra = find(&mut parent, pair[0] as usize);
            let rb = find(&mut parent, pair[1] as usize);
            if ra != rb {
                parent[ra] = rb;
            }
        }

        let mut groups: std::collections::HashMap<usize, Vec<usize>> = std::collections::HashMap::new();
        for i in 0..n {
            let root = find(&mut parent, i);
            groups.entry(root).or_default().push(i);
        }

        let mut result = bytes;
        // smallest characters to the smallest indices of each component;
        // components are independent so this is globally optimal
        for (_, mut indices) in groups {
            indices.sort_unstable();
            let mut chars: Vec<u8> = indices.iter().map(|&i| result[i]).collect();
            chars.sort_unstable();
            for (i, &idx) in indices.iter().enumerate() {
                result[idx] = chars[i];
            }
        }
        String::from_utf8(result).unwrap()
    }
}
