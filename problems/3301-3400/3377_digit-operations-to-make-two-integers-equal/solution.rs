use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    // Every value n takes must be non-prime and keeps exactly len(n)
    // digits — decrementing a leading 1 is not a legal op — so the
    // states form a tiny graph: fewer than 1e4 nodes, at most 8
    // single-digit +-1 moves each. Dijkstra with the destination value
    // as the edge weight and the start value as the initial cost sums
    // every value n takes, original included (the example path
    // 10 -> 20 -> 21 -> 22 -> 12 costs 10+20+21+22+12 = 85). Each
    // state contributes its value at most once and weights are < 1e4,
    // so costs stay under 1e8 — safely inside 32-bit range.
    pub fn min_operations(n: i32, m: i32) -> i32 {
        const LIMIT: usize = 10000;
        let mut is_comp = vec![false; LIMIT];
        let mut i = 2;
        while i * i < LIMIT {
            if !is_comp[i] {
                let mut j = i * i;
                while j < LIMIT {
                    is_comp[j] = true;
                    j += i;
                }
            }
            i += 1;
        }
        let is_prime = |v: i32| v >= 2 && !is_comp[v as usize];
        if is_prime(n) || is_prime(m) {
            return -1;
        }
        let mut top = 1;
        for _ in 1..n.to_string().len() {
            top *= 10;
        }
        let mut dist = vec![-1i32; LIMIT];
        let mut heap = BinaryHeap::new();
        dist[n as usize] = n;
        heap.push(Reverse((n, n)));
        while let Some(Reverse((d, u))) = heap.pop() {
            if d > dist[u as usize] {
                continue;
            }
            if u == m {
                return d;
            }
            let mut p = top;
            loop {
                let digit = (u / p) % 10;
                let cands = [
                    (digit < 9).then(|| u + p),
                    (digit > 0 && !(p == top && digit == 1)).then(|| u - p),
                ];
                for y in cands.into_iter().flatten() {
                    if y >= 2 && is_comp[y as usize] {
                        let nd = d + y;
                        if dist[y as usize] < 0 || nd < dist[y as usize] {
                            dist[y as usize] = nd;
                            heap.push(Reverse((nd, y)));
                        }
                    }
                }
                if p == 1 {
                    break;
                }
                p /= 10;
            }
        }
        -1
    }
}
