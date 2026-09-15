impl Solution {
    pub fn max_area(h: i64, w: i64, mut horizontal_cuts: Vec<i64>, mut vertical_cuts: Vec<i64>) -> i64 {
        const MOD: i64 = 1_000_000_007;
        let max_h = widest(h, &mut horizontal_cuts);
        let max_w = widest(w, &mut vertical_cuts);
        (max_h % MOD) * (max_w % MOD) % MOD
    }
}

fn widest(length: i64, cuts: &mut Vec<i64>) -> i64 {
    cuts.sort_unstable();
    let mut best = cuts[0].max(length - cuts[cuts.len() - 1]);
    for i in 1..cuts.len() {
        best = best.max(cuts[i] - cuts[i - 1]);
    }
    best
}
