impl Solution {
    // Every edge needs lcm(nums[i], nums[j]) <= threshold, and the lcm
    // is a multiple of both values, so values above the threshold are
    // isolated singletons. Enumerate present values ascending, keeping
    // anchor[m] = the smallest present divisor of each multiple m:
    // every later present divisor of m unions with it, and since both
    // divide m the edge is genuine (lcm | m <= threshold). Every
    // genuine edge (a, b) is covered at m = lcm(a, b). The scans cost
    // the harmonic sum ~threshold*ln(threshold). Iterative DSU with
    // path halving and union by size; values up to 1e9 are never
    // multiplied and the answer fits 32 bits.
    pub fn count_components(nums: Vec<i32>, threshold: i32) -> i32 {
        let n = nums.len();
        let t = threshold as usize;
        let mut parent: Vec<usize> = (0..n).collect();
        let mut size = vec![1usize; n];

        fn find(parent: &mut [usize], mut x: usize) -> usize {
            while parent[x] != x {
                parent[x] = parent[parent[x]];
                x = parent[x];
            }
            x
        }

        let mut unite = |a: usize, b: usize, parent: &mut Vec<usize>, size: &mut Vec<usize>| {
            let ra = find(parent, a);
            let rb = find(parent, b);
            if ra != rb {
                let (hi, lo) = if size[ra] < size[rb] { (rb, ra) } else { (ra, rb) };
                parent[lo] = hi;
                size[hi] += size[lo];
            }
        };

        let mut present = vec![-1i32; t + 1];
        for (i, &v) in nums.iter().enumerate() {
            if (v as usize) <= t {
                present[v as usize] = i as i32;
            }
        }
        let mut anchor = vec![-1i32; t + 1];
        for v in 1..=t {
            let i = present[v];
            if i < 0 {
                continue;
            }
            let i = i as usize;
            if anchor[v] >= 0 {
                unite(i, anchor[v] as usize, &mut parent, &mut size);
            }
            let mut m = 2 * v;
            while m <= t {
                if anchor[m] >= 0 {
                    unite(i, anchor[m] as usize, &mut parent, &mut size);
                } else {
                    anchor[m] = i as i32;
                }
                m += v;
            }
        }
        let mut comps = 0i32;
        for i in 0..n {
            if find(&mut parent, i) == i {
                comps += 1;
            }
        }
        comps
    }
}
