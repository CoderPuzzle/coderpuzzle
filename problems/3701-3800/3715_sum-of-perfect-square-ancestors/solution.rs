impl Solution {
    pub fn sum_of_ancestors(parent: Vec<i32>, nums: Vec<i32>) -> i64 {
        let n = parent.len();
        let max_value = *nums.iter().max().unwrap() as usize;

        // Smallest-prime-factor sieve up to the largest value present.
        let mut spf = vec![0_usize; max_value + 1];
        for i in 2..=max_value {
            if spf[i] == 0 {
                let mut j = i;
                while j <= max_value {
                    if spf[j] == 0 {
                        spf[j] = i;
                    }
                    j += i;
                }
            }
        }

        // Square-free kernel: the product of primes dividing the value an
        // odd number of times. Two positive integers multiply to a perfect
        // square exactly when their kernels are equal.
        let mut kernel = vec![1_usize; n];
        for i in 0..n {
            let mut v = nums[i] as usize;
            while v > 1 {
                let p = spf[v];
                let mut odd = false;
                while v % p == 0 {
                    v /= p;
                    odd = !odd;
                }
                if odd {
                    kernel[i] *= p;
                }
            }
        }

        let mut children: Vec<Vec<usize>> = vec![Vec::new(); n];
        for i in 1..n {
            children[parent[i] as usize].push(i);
        }

        // Iterative depth-first walk; freq[k] counts ancestors on the
        // current root path whose kernel is k. Entering a node first adds
        // its matches, then records its own kernel; the node + n marker
        // undoes the record once the whole subtree is done.
        let mut freq = vec![0_i64; max_value + 1];
        let mut total = 0_i64;
        let mut stack: Vec<usize> = Vec::with_capacity(2 * n + 1);
        stack.push(0);
        while let Some(node) = stack.pop() {
            if node < n {
                total += freq[kernel[node]];
                freq[kernel[node]] += 1;
                stack.push(node + n);
                for &child in &children[node] {
                    stack.push(child);
                }
            } else {
                freq[kernel[node - n]] -= 1;
            }
        }
        total
    }
}
