use std::collections::HashMap;

impl Solution {
    pub fn max_alternating_sum(nums: Vec<i32>, swaps: Vec<Vec<i32>>) -> i64 {
        // A pair lets its two indices trade values any number of times, so
        // each connected component of the swap graph rearranges freely:
        // merge the pair's endpoints with a union-find.
        let n = nums.len();
        let mut parent: Vec<usize> = (0..n).collect();
        let mut sz = vec![1usize; n];

        // Two-pass path compression keeps every later find near O(1).
        fn find(parent: &mut [usize], mut x: usize) -> usize {
            let mut root = x;
            while parent[root] != root {
                root = parent[root];
            }
            while parent[x] != root {
                let up = parent[x];
                parent[x] = root;
                x = up;
            }
            root
        }

        for pair in &swaps {
            let mut ra = find(&mut parent, pair[0] as usize);
            let mut rb = find(&mut parent, pair[1] as usize);
            if ra == rb {
                continue;
            }
            if sz[ra] < sz[rb] {
                std::mem::swap(&mut ra, &mut rb);
            }
            parent[rb] = ra;
            sz[ra] += sz[rb];
        }

        // Collect each component's values and count its even-index slots.
        let mut groups: HashMap<usize, (Vec<i64>, usize)> = HashMap::new();
        for i in 0..n {
            let r = find(&mut parent, i);
            let entry = groups.entry(r).or_default();
            entry.0.push(nums[i] as i64);
            if i % 2 == 0 {
                entry.1 += 1;
            }
        }

        // With E even slots in a component, placing its E largest values on
        // them contributes 2*sumTopE - sumAll; totals reach ~1e14, hence
        // i64 throughout.
        let mut ans: i64 = 0;
        for (_, (mut vals, e)) in groups {
            vals.sort_unstable();
            let m = vals.len();
            let (mut top_e, mut all) = (0i64, 0i64);
            for (j, v) in vals.iter().enumerate() {
                all += v;
                if j >= m - e {
                    top_e += v;
                }
            }
            ans += 2 * top_e - all;
        }
        ans
    }
}
