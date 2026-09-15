impl Solution {
    pub fn max_envelopes(mut envelopes: Vec<Vec<i32>>) -> i32 {
        // Width ascending, height descending on ties: a chain needs strictly
        // increasing widths, so at most one envelope per width fits, and the
        // descending tie-break keeps equal widths from chaining among
        // themselves — the task reduces to LIS on heights.
        envelopes.sort_by(|a, b| a[0].cmp(&b[0]).then(b[1].cmp(&a[1])));
        // Patience sorting: tails[i] = min height ending a chain of length i+1.
        let mut tails: Vec<i32> = Vec::new();
        for e in &envelopes {
            let x = e[1];
            // partition_point is a lower bound: STRICT increase (rejects
            // equal heights); extend the longest chain or replace the
            // first >= tail — safe, it only helps future extensions.
            let i = tails.partition_point(|&t| t < x);
            if i == tails.len() {
                tails.push(x);
            } else {
                tails[i] = x;
            }
        }
        tails.len() as i32
    }
}
