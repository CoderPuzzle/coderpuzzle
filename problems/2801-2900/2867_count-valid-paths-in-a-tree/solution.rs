impl Solution {
    pub fn count_paths(n: i32, edges: Vec<Vec<i32>>) -> i64 {
        let n = n as usize;
        // sieve of primes up to n
        let mut prime = vec![true; n + 1];
        prime[0] = false;
        prime[1] = false;
        let mut p = 2usize;
        while p * p <= n {
            if prime[p] {
                let mut m = p * p;
                while m <= n {
                    prime[m] = false;
                    m += p;
                }
            }
            p += 1;
        }

        let mut graph: Vec<Vec<usize>> = vec![Vec::new(); n + 1];
        for e in &edges {
            let u = e[0] as usize;
            let v = e[1] as usize;
            graph[u].push(v);
            graph[v].push(u);
        }

        let mut parent = vec![0usize; n + 1];
        let mut order: Vec<usize> = Vec::with_capacity(n);
        order.push(1);
        let mut i = 0;
        while i < order.len() {
            let x = order[i];
            for &y in &graph[x] {
                if y != parent[x] {
                    parent[y] = x;
                    order.push(y);
                }
            }
            i += 1;
        }

        // dp0[x] / dp1[x] = number of nodes y in subtree(x) whose path x..y
        // contains 0 / exactly 1 prime node.
        let mut dp0 = vec![0i64; n + 1];
        let mut dp1 = vec![0i64; n + 1];
        let mut ans: i64 = 0;
        for &x in order.iter().rev() {
            if prime[x] {
                dp0[x] = 0;
                dp1[x] = 1;
            } else {
                dp0[x] = 1;
                dp1[x] = 0;
            }
            let (mut total0, mut total1) = if prime[x] { (0i64, 1i64) } else { (1i64, 0i64) };
            for &y in &graph[x] {
                if parent[y] != x {
                    continue;
                }
                let (c0, c1) = if prime[x] { (0i64, dp0[y]) } else { (dp0[y], dp1[y]) };
                if prime[x] {
                    // need f(a) + f(b) == 2 (both endpoints one prime)
                    ans += total1 * c1;
                } else {
                    ans += total0 * c1 + total1 * c0;
                }
                total0 += c0;
                total1 += c1;
                if prime[x] {
                    dp1[x] += dp0[y];
                } else {
                    dp0[x] += dp0[y];
                    dp1[x] += dp1[y];
                }
            }
        }
        ans
    }
}
