use std::cmp::Ordering;
use std::collections::BinaryHeap;

#[derive(Eq, PartialEq)]
struct Pair(i64, i32, i32);

impl Ord for Pair {
    fn cmp(&self, other: &Self) -> Ordering {
        // BinaryHeap pops the largest; reverse so the minimum (sum, left)
        // pair comes out first.
        other.0.cmp(&self.0).then_with(|| other.1.cmp(&self.1))
    }
}

impl PartialOrd for Pair {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}

impl Solution {
    // Simulate with a doubly linked list over the original indices and a
    // min-heap of (sum, left, right). A pair is valid only if its left node
    // is still alive and still points at its recorded right neighbour; stale
    // entries are discarded when popped. A "bad count" of adjacent descents
    // tells us when the array is non-decreasing.
    pub fn minimum_pair_removal(nums: Vec<i32>) -> i32 {
        let n = nums.len();
        let mut val: Vec<i64> = nums.iter().map(|&v| v as i64).collect();
        let mut prev = vec![0i32; n];
        let mut nxt = vec![0i32; n];
        for i in 0..n {
            prev[i] = i as i32 - 1;
            nxt[i] = i as i32 + 1;
        }
        nxt[n - 1] = -1;
        let mut alive = vec![true; n];
        let mut bad = 0;
        for i in 0..n - 1 {
            if val[i] > val[nxt[i] as usize] {
                bad += 1;
            }
        }
        if bad == 0 {
            return 0;
        }
        let mut heap = BinaryHeap::new();
        for i in 0..n - 1 {
            heap.push(Pair(val[i] + val[i + 1], i as i32, i as i32 + 1));
        }
        let mut ops = 0;
        while bad > 0 {
            let Pair(s, aa, bb) = heap.pop().unwrap();
            let a = aa as usize;
            let b = bb as usize;
            if !alive[a] || nxt[a] != bb || val[a] + val[b] != s {
                continue;
            }
            let pa = prev[a];
            let nb = nxt[b];
            // Folding b into a replaces the three adjacencies (pa,a), (a,b)
            // and (b,nb) with (pa,a) and (a,nb), so adjust bad around them.
            if pa != -1 && val[pa as usize] > val[a] {
                bad -= 1;
            }
            if val[a] > val[b] {
                bad -= 1;
            }
            if nb != -1 && val[b] > val[nb as usize] {
                bad -= 1;
            }
            val[a] += val[b];
            alive[b] = false;
            nxt[a] = nb;
            if nb != -1 {
                prev[nb as usize] = aa;
            }
            if pa != -1 && val[pa as usize] > val[a] {
                bad += 1;
            }
            if nb != -1 && val[a] > val[nb as usize] {
                bad += 1;
            }
            ops += 1;
            if bad == 0 {
                break;
            }
            if pa != -1 {
                heap.push(Pair(val[pa as usize] + val[a], pa, aa));
            }
            if nb != -1 {
                heap.push(Pair(val[a] + val[nb as usize], aa, nb));
            }
        }
        ops
    }
}
