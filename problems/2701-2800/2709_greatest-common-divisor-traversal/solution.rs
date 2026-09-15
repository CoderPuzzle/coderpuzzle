use std::collections::HashMap;

impl Solution {
    pub fn can_traverse_all_pairs(nums: Vec<i32>) -> bool {
        let n = nums.len();
        if n == 1 {
            return true;
        }
        // 1 has no prime factors, so it can never share an edge.
        if nums.iter().any(|&x| x == 1) {
            return false;
        }

        // Sieve smallest prime factors once so any value decomposes into its
        // distinct primes by repeated SPF division.
        let maxv = *nums.iter().max().unwrap() as usize;
        let mut spf: Vec<usize> = (0..=maxv).collect();
        let mut i = 2usize;
        while i * i <= maxv {
            if spf[i] == i {
                let mut j = i * i;
                while j <= maxv {
                    if spf[j] == j {
                        spf[j] = i;
                    }
                    j += i;
                }
            }
            i += 1;
        }

        fn find(parent: &mut Vec<usize>, mut x: usize) -> usize {
            while parent[x] != x {
                parent[x] = parent[parent[x]];
                x = parent[x];
            }
            x
        }

        let mut parent: Vec<usize> = (0..n).collect();
        // Each prime is a hub chaining its indices: union against the
        // previous claimer, then take ownership — consecutive links keep a
        // prime's indices mutually connected with linearly many unions
        // instead of quadratic.
        let mut last: HashMap<usize, usize> = HashMap::new();
        for (i, &x) in nums.iter().enumerate() {
            let mut v = x as usize;
            while v > 1 {
                let p = spf[v];
                if let Some(&j) = last.get(&p) {
                    let ra = find(&mut parent, i);
                    let rb = find(&mut parent, j);
                    if ra != rb {
                        parent[ra] = rb;
                    }
                }
                last.insert(p, i);
                while v % p == 0 {
                    v /= p;
                }
            }
        }

        // All indices mutually reachable iff one component holds them all.
        let root = find(&mut parent, 0);
        (1..n).all(|i| find(&mut parent, i) == root)
    }
}
