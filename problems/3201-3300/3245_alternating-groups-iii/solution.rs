struct Fenwick {
    n: i64,
    bit: Vec<i64>,
}

impl Fenwick {
    fn new(n: i64) -> Self {
        Fenwick {
            n,
            bit: vec![0; (n + 1) as usize],
        }
    }

    fn add(&mut self, i: i64, delta: i64) {
        let mut i = i + 1;
        while i <= self.n {
            self.bit[i as usize] += delta;
            i += i & i.wrapping_neg();
        }
    }

    fn prefix(&self, i: i64) -> i64 {
        let mut i = i + 1;
        let mut total = 0;
        while i > 0 {
            total += self.bit[i as usize];
            i -= i & i.wrapping_neg();
        }
        total
    }
}

// Multiset of good-edge run lengths: two Fenwick trees keyed by length (one
// counting runs, one summing lengths) plus the running count/sum totals.
struct Runs {
    fen_cnt: Fenwick,
    fen_sum: Fenwick,
    cnt_all: i64,
    sum_all: i64,
    n: i64,
}

fn cyc(d: i64, n: i64) -> i64 {
    d.rem_euclid(n)
}

fn runs_update(runs: &mut Runs, length: i64, delta: i64) {
    if length > 0 {
        runs.fen_cnt.add(length, delta);
        runs.fen_sum.add(length, delta * length);
        runs.cnt_all += delta;
        runs.sum_all += delta * length;
    }
}

fn prev_bad(bads: &std::collections::BTreeSet<i64>, e: i64) -> i64 {
    match bads.range(..e).next_back() {
        Some(&p) => p,
        None => *bads.last().unwrap(),
    }
}

fn next_bad(bads: &std::collections::BTreeSet<i64>, e: i64) -> i64 {
    match bads.range(e + 1..).next() {
        Some(&x) => x,
        None => *bads.first().unwrap(),
    }
}

fn insert_edge(bads: &mut std::collections::BTreeSet<i64>, runs: &mut Runs, e: i64) {
    let n = runs.n;
    if !bads.is_empty() {
        let p = prev_bad(bads, e);
        let nx = next_bad(bads, e);
        runs_update(runs, cyc(nx - p - 1, n), -1);
        runs_update(runs, cyc(e - p - 1, n), 1);
        runs_update(runs, cyc(nx - e - 1, n), 1);
    }
    bads.insert(e);
    if bads.len() == 1 {
        runs_update(runs, n - 1, 1);
    }
}

fn remove_edge(bads: &mut std::collections::BTreeSet<i64>, runs: &mut Runs, e: i64) {
    let n = runs.n;
    bads.remove(&e);
    if !bads.is_empty() {
        let p = prev_bad(bads, e);
        let nx = next_bad(bads, e);
        runs_update(runs, cyc(e - p - 1, n), -1);
        runs_update(runs, cyc(nx - e - 1, n), -1);
        runs_update(runs, cyc(nx - p - 1, n), 1);
    } else {
        runs_update(runs, n - 1, -1);
    }
}

impl Solution {
    pub fn number_of_alternating_groups(mut colors: Vec<i32>, queries: Vec<Vec<i32>>) -> Vec<i32> {
        // Edge j joins tile j and tile j + 1 circularly and is bad when its two
        // endpoints share a color. A size-k group starting at tile s spans the
        // k - 1 consecutive edges s..s+k-2, so counting size-k groups means
        // counting starting edges followed by k - 1 good edges. Keep the bad
        // edges in an ordered set and the multiset of good-edge runs between
        // neighboring bad edges in two Fenwick trees keyed by run length; a
        // repaint toggles exactly two edges, each splitting or merging a single
        // run, and with no bad edge left every one of the n starts works.
        let n = colors.len() as i64;
        let mut bads: std::collections::BTreeSet<i64> = std::collections::BTreeSet::new();
        let mut bad = vec![false; n as usize];
        let mut runs = Runs {
            fen_cnt: Fenwick::new(n),
            fen_sum: Fenwick::new(n),
            cnt_all: 0,
            sum_all: 0,
            n,
        };
        for j in 0..n {
            bad[j as usize] = colors[j as usize] == colors[((j + 1) % n) as usize];
            if bad[j as usize] {
                insert_edge(&mut bads, &mut runs, j);
            }
        }

        let mut answer: Vec<i32> = Vec::new();
        for query in &queries {
            if query[0] == 1 {
                if bads.is_empty() {
                    answer.push(n as i32);
                    continue;
                }
                let need = query[1] as i64 - 1;
                let cnt_ge = runs.cnt_all - runs.fen_cnt.prefix(need - 1);
                let sum_ge = runs.sum_all - runs.fen_sum.prefix(need - 1);
                answer.push((sum_ge - (need - 1) * cnt_ge) as i32);
            } else {
                let index = query[1] as i64;
                let color = query[2];
                if colors[index as usize] == color {
                    continue;
                }
                colors[index as usize] = color;
                for e in [(index + n - 1) % n, index] {
                    let is_bad = colors[e as usize] == colors[((e + 1) % n) as usize];
                    if is_bad == bad[e as usize] {
                        continue;
                    }
                    bad[e as usize] = is_bad;
                    if is_bad {
                        insert_edge(&mut bads, &mut runs, e);
                    } else {
                        remove_edge(&mut bads, &mut runs, e);
                    }
                }
            }
        }
        answer
    }
}
