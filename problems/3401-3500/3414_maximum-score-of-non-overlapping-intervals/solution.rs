// State carries the best score for a prefix plus the lexicographically
// smallest ascending index tuple achieving it (at most four picks).
#[derive(Clone)]
struct State {
    score: i64,
    slots: [i32; 4],
    len: usize,
}

fn less_tup(a: &State, b: &State) -> bool {
    for t in 0..4 {
        let va = if t < a.len { a.slots[t] } else { -1 };
        let vb = if t < b.len { b.slots[t] } else { -1 };
        if va != vb {
            return va < vb;
        }
    }
    false
}

impl Solution {
    pub fn maximum_weight(intervals: Vec<Vec<i32>>) -> Vec<i32> {
        let n = intervals.len();
        // Sort by right endpoint: every pick set is a chain in this order,
        // and sharing any point (even one boundary) means overlapping, so
        // predecessors must end strictly left of the current left end.
        let mut order: Vec<usize> = (0..n).collect();
        order.sort_by(|&a, &b| (intervals[a][1], intervals[a][0]).cmp(&(intervals[b][1], intervals[b][0])));
        let rights: Vec<i32> = order.iter().map(|&t| intervals[t][1]).collect();

        let neg = -(1i64 << 62);
        // Layer k: over prefix length i, best score picking exactly k of
        // the first i sorted intervals.
        let empty = State {
            score: 0,
            slots: [0; 4],
            len: 0,
        };
        let mut prev = vec![empty.clone(); n + 1];
        let mut cur = vec![empty.clone(); n + 1];
        let mut best = vec![empty.clone(); 5];
        for k in 1..=4usize {
            cur[0] = State {
                score: neg,
                slots: [0; 4],
                len: 0,
            };
            for i in 1..=n {
                cur[i] = cur[i - 1].clone();
                let idx = order[i - 1];
                let left = intervals[idx][0];
                let weight = intervals[idx][2] as i64;
                // Predecessors end strictly left of `left`.
                let j = rights.partition_point(|&r| r < left);
                if prev[j].score > neg / 4 {
                    let cand_score = prev[j].score + weight;
                    let mut cand = prev[j].clone();
                    cand.score = cand_score;
                    let mut pos = cand.len;
                    while pos > 0 && cand.slots[pos - 1] > idx as i32 {
                        pos -= 1;
                    }
                    for t in (pos..cand.len).rev() {
                        cand.slots[t + 1] = cand.slots[t];
                    }
                    cand.slots[pos] = idx as i32;
                    cand.len += 1;
                    // Score first; on a tie the smaller index tuple wins.
                    if cand_score > cur[i].score || (cand_score == cur[i].score && less_tup(&cand, &cur[i])) {
                        cur[i] = cand;
                    }
                }
            }
            best[k] = cur[n].clone();
            std::mem::swap(&mut prev, &mut cur);
        }

        let top = (1..=4).map(|k| best[k].score).max().unwrap();
        let mut winner = 0;
        for k in 1..=4 {
            if best[k].score == top && (winner == 0 || less_tup(&best[k], &best[winner])) {
                winner = k;
            }
        }
        best[winner].slots[..best[winner].len].to_vec()
    }
}
