impl Solution {
    fn find(parent: &mut Vec<i32>, a: usize) -> usize {
        let mut a = a;
        while parent[a] as usize != a {
            let p = parent[a] as usize;
            parent[a] = parent[p];
            a = parent[a] as usize;
        }
        a
    }

    fn unite(parent: &mut Vec<i32>, size: &mut Vec<i32>, a: usize, b: usize) -> bool {
        let mut a = Self::find(parent, a);
        let mut b = Self::find(parent, b);
        if a == b {
            return false;
        }
        if size[a] < size[b] {
            std::mem::swap(&mut a, &mut b);
        }
        parent[b] = a as i32;
        size[a] += size[b];
        true
    }

    fn feasible(x: i64, n: usize, edges: &[Vec<i32>], k: i32, parent: &mut Vec<i32>, size: &mut Vec<i32>) -> bool {
        for i in 0..n {
            parent[i] = i as i32;
            size[i] = 1;
        }

        for e in edges {
            if e[3] == 1 {
                if (e[2] as i64) < x {
                    return false;
                }
                if !Self::unite(parent, size, e[0] as usize, e[1] as usize) {
                    return false;
                }
            }
        }
        for e in edges {
            if e[3] == 0 && (e[2] as i64) >= x {
                Self::unite(parent, size, e[0] as usize, e[1] as usize);
            }
        }
        let mut upgrades = 0;
        for e in edges {
            if e[3] == 0 && (e[2] as i64) < x && 2 * e[2] as i64 >= x {
                if Self::unite(parent, size, e[0] as usize, e[1] as usize) {
                    upgrades += 1;
                    if upgrades > k {
                        return false;
                    }
                }
            }
        }
        let root = Self::find(parent, 0);
        for i in 1..n {
            if Self::find(parent, i) != root {
                return false;
            }
        }
        true
    }

    pub fn max_stability(n: i32, edges: Vec<Vec<i32>>, k: i32) -> i32 {
        let n = n as usize;
        let mut parent: Vec<i32> = vec![0; n];
        let mut size: Vec<i32> = vec![0; n];

        if !Self::feasible(1, n, &edges, k, &mut parent, &mut size) {
            return -1;
        }
        let mut lo: i64 = 1;
        let mut hi: i64 = 200001; // si <= 1e5 so 2*si <= 2e5
        while lo + 1 < hi {
            let mid = (lo + hi) / 2;
            if Self::feasible(mid, n, &edges, k, &mut parent, &mut size) {
                lo = mid;
            } else {
                hi = mid;
            }
        }
        lo as i32
    }
}
