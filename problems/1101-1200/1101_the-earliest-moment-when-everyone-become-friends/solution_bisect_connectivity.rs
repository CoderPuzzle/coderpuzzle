impl Solution {
    pub fn earliest_acq(logs: Vec<Vec<i32>>, n: i32) -> i32 {
        // Replay order first: the bisection asks prefix questions of the
        // chronologically sorted logs.
        let n = n as usize;
        let mut sorted = logs;
        sorted.sort_by_key(|log| log[0]);
        // Predicate for the bisection: does the prefix of the k soonest
        // logs already hold all n elements in one group? A fresh
        // union-find per probe.
        fn connected(sorted: &[Vec<i32>], n: usize, k: usize) -> bool {
            // Path-halving find keeps the trees shallow within one probe.
            fn find(parent: &mut [usize], mut a: usize) -> usize {
                while parent[a] != a {
                    parent[a] = parent[parent[a]];
                    a = parent[a];
                }
                a
            }
            let mut parent: Vec<usize> = (0..n).collect();
            // The component counter tracks the group count so no global scan
            // is ever needed.
            let mut components = n;
            for log in &sorted[..k] {
                let rx = find(&mut parent, log[1] as usize);
                let ry = find(&mut parent, log[2] as usize);
                // Redundant (already-connected) logs merge nothing.
                if rx != ry {
                    parent[rx] = ry;
                    components -= 1;
                }
            }
            components == 1
        }
        // Links never disappear, so once connected always connected: the
        // predicate is monotone in k and the smallest true k can be bisected.
        let m = sorted.len();
        if !connected(&sorted, n, m) {
            return -1;
        }
        let mut lo = 1usize;
        let mut hi = m;
        while lo < hi {
            let mid = lo + (hi - lo) / 2;
            if connected(&sorted, n, mid) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        // The last event of the surviving prefix carries the answer's moment.
        sorted[lo - 1][0]
    }
}
