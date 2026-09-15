use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    // Parametric wrap cut: fix the signed flow t across the wrap edge; the
    // total cost |t| + inner path cost is convex in t, so a binary search
    // finds the integer minimizer.
    pub fn min_moves(balance: Vec<i32>) -> i64 {
        let n = balance.len();
        let sum: i64 = balance.iter().map(|&x| x as i64).sum();
        if sum < 0 {
            return -1;
        }
        if n == 1 {
            return 0;
        }
        let bound = Self::total(&balance, 0);
        let (mut lo, mut hi) = (-bound, bound);
        while lo < hi {
            let mid = lo + (hi - lo) / 2;
            if Self::total(&balance, mid) <= Self::total(&balance, mid + 1) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        Self::total(&balance, lo)
    }

    fn total(balance: &[i32], t: i64) -> i64 {
        t.abs() + Self::line_cost(balance, t)
    }

    // Minimum flow cost on the path 0..n-2 with the wrap edge fixed at
    // signed flow t: sweep positions keeping the convex suffix-min envelope
    // of the DP as a constant plus rising-flank breakpoints.
    fn line_cost(balance: &[i32], t: i64) -> i64 {
        let n = balance.len();
        let mut cost = 0i64;
        let mut delta = 0i64;
        // stored breakpoints; true position = stored + delta
        let mut heap: BinaryHeap<Reverse<i64>> = BinaryHeap::new();
        for k in 0..n - 1 {
            delta += balance[k] as i64;
            let cap = delta;
            let z = -t;
            if let Some(&Reverse(stored)) = heap.peek() {
                let low = stored + delta;
                if z <= low {
                    heap.push(Reverse(z - delta));
                } else if z <= cap {
                    // valley below the current minimum: consume it and split
                    // the flank in two inside the support
                    cost += z - low;
                    heap.pop();
                    heap.push(Reverse(z - delta));
                    heap.push(Reverse(z - delta));
                } else {
                    // valley beyond the capped support: lowest breakpoint is
                    // absorbed into the constant
                    cost += z - low;
                    heap.pop();
                }
            } else if z <= cap {
                heap.push(Reverse(z - delta));
            } else {
                cost += z - cap;
            }
        }
        let limit = -(balance[n - 1] as i64);
        while let Some(&Reverse(low)) = heap.peek() {
            let true_pos = low + delta;
            if true_pos >= limit {
                break;
            }
            cost += limit - true_pos;
            heap.pop();
        }
        cost
    }
}
