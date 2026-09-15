impl Solution {
    // Two values land in one component exactly when a chain of shared
    // prime factors links them: sharing a factor greater than 1 means
    // sharing a prime, and every path in the graph alternates values
    // with the primes they share. A smallest-prime-factor sieve up to
    // the largest value factorizes each number in a handful of
    // divisions, a union-find keyed by factor unions every value with
    // each of its primes, and the largest class counted over the
    // values is the answer — the value 1, having no prime factor,
    // stays a singleton.
    pub fn largest_component_size(nums: Vec<i32>) -> i32 {
        let m = *nums.iter().max().unwrap() as usize;

        let mut spf: Vec<usize> = (0..=m).collect();
        let mut i = 2;
        while i * i <= m {
            if spf[i] == i {
                let mut j = i * i;
                while j <= m {
                    if spf[j] == j {
                        spf[j] = i;
                    }
                    j += i;
                }
            }
            i += 1;
        }

        let mut parent: Vec<usize> = (0..=m).collect();
        let mut size: Vec<i32> = vec![1; m + 1];

        fn find(parent: &mut Vec<usize>, x: usize) -> usize {
            let mut x = x;
            while parent[x] != x {
                parent[x] = parent[parent[x]];
                x = parent[x];
            }
            x
        }

        fn union(parent: &mut Vec<usize>, size: &mut Vec<i32>, a: usize, b: usize) {
            let mut ra = find(parent, a);
            let mut rb = find(parent, b);
            if ra == rb {
                return;
            }
            if size[ra] < size[rb] {
                std::mem::swap(&mut ra, &mut rb);
            }
            parent[rb] = ra;
            size[ra] += size[rb];
        }

        for &v in &nums {
            let mut x = v as usize;
            while x > 1 {
                let p = spf[x];
                union(&mut parent, &mut size, v as usize, p);
                while x % p == 0 {
                    x /= p;
                }
            }
        }

        use std::collections::HashMap;
        let mut counts: HashMap<usize, i32> = HashMap::new();
        let mut best = 0;
        for &v in &nums {
            let count = counts.entry(find(&mut parent, v as usize)).or_insert(0);
            *count += 1;
            if *count > best {
                best = *count;
            }
        }
        best
    }
}
