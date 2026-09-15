use std::cmp::Reverse;
use std::collections::{BinaryHeap, HashMap};

impl Solution {
    // Dijkstra over (people-at-base mask, stage, boat side). Every leg has
    // a positive duration, so the first pop of a state is optimal. Base
    // side: cross any subgroup of size <= k; the stage advances by
    // floor(cross) % m. Destination side: one of the people already across
    // rows back while anyone remains at the base.
    pub fn min_time(n: i32, k: i32, m: i32, time: Vec<i32>, mul: Vec<f64>) -> f64 {
        let n = n as usize;
        let k = k as usize;
        let m = m as usize;
        let full = (1usize << n) - 1;
        // groups[mask] = subgroups of mask holding 1..k people.
        let mut groups: Vec<Vec<usize>> = vec![Vec::new(); full + 1];
        for mask in 0..=full {
            let mut sub = mask;
            while sub > 0 {
                if sub.count_ones() <= k as u32 {
                    groups[mask].push(sub);
                }
                sub = (sub - 1) & mask;
            }
        }
        // mx[s] = largest time among s's members: it sets the crossing time.
        let mut mx = vec![0i32; full + 1];
        for i in 0..n {
            mx[1 << i] = time[i];
        }
        for s in 1..=full {
            let low = s & s.wrapping_neg();
            if s != low {
                mx[s] = mx[low].max(mx[s ^ low]);
            }
        }
        // Distances ordered by their bit pattern: all totals are >= 0, so
        // ascending f64::to_bits is ascending value.
        let mut dist: HashMap<usize, f64> = HashMap::new();
        let mut heap = BinaryHeap::new();
        let start = (full << 4) | 0;
        dist.insert(start, 0.0);
        heap.push(Reverse((0.0f64.to_bits(), start)));
        let mut ans = -1.0f64;
        while let Some(Reverse((dbits, state))) = heap.pop() {
            let d = f64::from_bits(dbits);
            if dist[&state] < d {
                continue;
            }
            let mask = state >> 4;
            let j = (state >> 1) & 7;
            let side = state & 1;
            if side == 0 {
                for &s in &groups[mask] {
                    let cross = mx[s] as f64 * mul[j];
                    let nd = d + cross;
                    let rest = mask ^ s;
                    if rest == 0 {
                        // final crossing: nobody left behind, no return
                        if ans < 0.0 || nd < ans {
                            ans = nd;
                        }
                    } else {
                        let nj = (j + cross.floor() as usize) % m;
                        let nstate = (rest << 4) | (nj << 1) | 1;
                        if nd < *dist.get(&nstate).unwrap_or(&f64::MAX) {
                            dist.insert(nstate, nd);
                            heap.push(Reverse((nd.to_bits(), nstate)));
                        }
                    }
                }
            } else {
                for r in 0..n {
                    if mask >> r & 1 == 1 {
                        continue;
                    }
                    let ret = time[r] as f64 * mul[j];
                    let nj = (j + ret.floor() as usize) % m;
                    let nstate = ((mask | 1 << r) << 4) | (nj << 1);
                    let nd = d + ret;
                    if nd < *dist.get(&nstate).unwrap_or(&f64::MAX) {
                        dist.insert(nstate, nd);
                        heap.push(Reverse((nd.to_bits(), nstate)));
                    }
                }
            }
        }
        ans
    }
}
