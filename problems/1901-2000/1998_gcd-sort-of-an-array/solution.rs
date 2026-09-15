impl Solution {
    pub fn gcd_sort(nums: Vec<i32>) -> bool {
        const MX: usize = 100001;
        // Smallest-prime-factor sieve: spf[v] lets each value be split into
        // its distinct primes by repeated division.
        let mut spf = vec![0usize; MX];
        for i in 0..MX {
            spf[i] = i;
        }
        let mut i = 2;
        while i * i < MX {
            if spf[i] == i {
                let mut j = i * i;
                while j < MX {
                    if spf[j] == j {
                        spf[j] = i;
                    }
                    j += i;
                }
            }
            i += 1;
        }

        // Union-find over values and primes: a swap is legal when the two
        // values share a prime, and chains of swaps make any two values in
        // one component mutually reachable.
        let mut parent = vec![0usize; MX];
        for i in 0..MX {
            parent[i] = i;
        }

        // Path halving keeps the forest shallow.
        let find = |parent: &mut Vec<usize>, mut a: usize| -> usize {
            while parent[a] != a {
                parent[a] = parent[parent[a]];
                a = parent[a];
            }
            a
        };

        // Link each value to each of its distinct primes. Indexing by value
        // (not position) automatically merges equal values across positions.
        for &x in &nums {
            let mut v = x as usize;
            while v > 1 {
                let p = spf[v];
                let ra = find(&mut parent, x as usize);
                let rb = find(&mut parent, p);
                if ra != rb {
                    parent[ra] = rb;
                }
                while v % p == 0 {
                    v /= p;
                }
            }
        }

        let mut target = nums.clone();
        target.sort_unstable();
        // Sortable iff every element shares a component with its sorted
        // target; a position spanning two components is immovable.
        for i in 0..nums.len() {
            if find(&mut parent, nums[i] as usize) != find(&mut parent, target[i] as usize) {
                return false;
            }
        }
        true
    }
}
