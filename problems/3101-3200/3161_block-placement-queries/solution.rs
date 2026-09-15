// Segment tree over starts 0..span-1 holding each start's free run d[i];
// tag 0 means untagged because every real obstacle distance is >= 1.
struct GapTree {
    span: usize,
    mx: Vec<i32>,
    tag: Vec<i32>,
}

impl GapTree {
    fn new(span: usize) -> Self {
        let mut t = GapTree {
            span,
            mx: vec![0; 4 * span],
            tag: vec![0; 4 * span],
        };
        t.build(1, 0, span - 1);
        t
    }

    fn build(&mut self, node: usize, lo: usize, hi: usize) {
        if lo == hi {
            // No obstacle yet: read the run as reaching past span, which
            // stays above any achievable sz without inventing blockage.
            self.mx[node] = (self.span - lo) as i32;
            return;
        }
        let mid = (lo + hi) / 2;
        self.build(node * 2, lo, mid);
        self.build(node * 2 + 1, mid + 1, hi);
        self.mx[node] = self.mx[node * 2].max(self.mx[node * 2 + 1]);
    }

    // assign lays an obstacle at `ob` across a gap: the run ob - i shrinks
    // as i grows, so the gap's best sits left.
    fn apply_to(&mut self, node: usize, lo: usize, ob: i32) {
        self.tag[node] = ob;
        self.mx[node] = ob - lo as i32;
    }

    fn push_down(&mut self, node: usize, lo: usize, mid: usize) {
        let tagv = self.tag[node];
        if tagv != 0 {
            self.apply_to(node * 2, lo, tagv);
            self.apply_to(node * 2 + 1, mid + 1, tagv);
            self.tag[node] = 0;
        }
    }

    fn assign(&mut self, node: usize, nl: usize, nr: usize, ql: usize, qr: usize, ob: i32) {
        if qr < nl || nr < ql {
            return;
        }
        if ql <= nl && nr <= qr {
            self.apply_to(node, nl, ob);
            return;
        }
        let mid = (nl + nr) / 2;
        self.push_down(node, nl, mid);
        self.assign(node * 2, nl, mid, ql, qr, ob);
        self.assign(node * 2 + 1, mid + 1, nr, ql, qr, ob);
        self.mx[node] = self.mx[node * 2].max(self.mx[node * 2 + 1]);
    }

    fn run_max(&mut self, node: usize, nl: usize, nr: usize, ql: usize, qr: usize) -> i32 {
        if qr < nl || nr < ql {
            return 0;
        }
        if ql <= nl && nr <= qr {
            return self.mx[node];
        }
        let mid = (nl + nr) / 2;
        self.push_down(node, nl, mid);
        let left = self.run_max(node * 2, nl, mid, ql, qr);
        let right = self.run_max(node * 2 + 1, mid + 1, nr, ql, qr);
        left.max(right)
    }
}

impl Solution {
    pub fn get_results(queries: Vec<Vec<i32>>) -> Vec<bool> {
        // d[i] is the free run at start i: the distance from i to the first
        // obstacle strictly after it. A block of size sz can be laid down at
        // start i exactly when d[i] >= sz -- an obstacle may be touched at
        // either end, so only one strictly inside the block forbids it.
        // Placing an obstacle at t rewrites that affine run across the gap it
        // splits; each type-2 query asks whether the best run among starts
        // [0, x - sz] reaches sz.
        let mut span = 1usize;
        let mut cand_set = std::collections::BTreeSet::new();
        for q in &queries {
            if q[0] == 2 {
                span = span.max(q[1] as usize);
            } else {
                cand_set.insert(q[1]);
            }
        }
        let cands: Vec<i32> = cand_set.iter().copied().collect();
        let k = cands.len();
        let mut fen = vec![0i32; k + 1];
        let mut tree = GapTree::new(span);
        let mut result = Vec::with_capacity(queries.len());
        for q in &queries {
            if q[0] == 1 {
                let t = q[1];
                // Binary search the sorted candidates for t's rank (1-based).
                let rank = cands.partition_point(|&v| v < t) + 1;
                let mut below = 0i32;
                let mut i = rank - 1;
                while i > 0 {
                    let low = i & i.wrapping_neg();
                    below += fen[i];
                    i -= low;
                }
                // Largest marked rank below ours = previous obstacle.
                let mut previous: i32 = -1;
                if below > 0 {
                    let mut pos = 0usize;
                    let mut remaining = below;
                    let mut step = k.next_power_of_two() >> 1;
                    while step > 0 {
                        let next = pos + step;
                        if next <= k && fen[next] < remaining {
                            remaining -= fen[next];
                            pos = next;
                        }
                        step >>= 1;
                    }
                    previous = cands[pos];
                }
                let mut i = rank;
                while i <= k {
                    let low = i & i.wrapping_neg();
                    fen[i] += 1;
                    i += low;
                }
                let lo = previous.max(0) as usize;
                let hi = ((t as usize).saturating_sub(1)).min(span - 1);
                // Everything right of t keeps its old nearest obstacle.
                if lo <= hi {
                    tree.assign(1, 0, span - 1, lo, hi, t);
                }
            } else {
                let x = q[1] as usize;
                let sz = q[2];
                let best = if x >= sz as usize {
                    tree.run_max(1, 0, span - 1, 0, x - sz as usize)
                } else {
                    0
                };
                result.push(best >= sz);
            }
        }
        result
    }
}
