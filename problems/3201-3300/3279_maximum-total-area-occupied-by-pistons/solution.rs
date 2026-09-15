use std::collections::BTreeMap;

impl Solution {
    pub fn max_area(height: i32, positions: Vec<i32>, directions: String) -> i64 {
        // The total moves each second by (#up - #down); that balance only
        // changes at critical times when a piston lands on an end and turns
        // around. Between critical times the total runs along a straight
        // line, so its peak sits at t = 0 or at some critical time.
        let mut events: BTreeMap<i64, i64> = BTreeMap::new();
        let mut balance = 0i64;
        for (i, &p) in positions.iter().enumerate() {
            let going_up = if p == 0 {
                true
            } else if p == height {
                false
            } else {
                directions.as_bytes()[i] == b'U'
            };
            let first = if going_up { height as i64 - p as i64 } else { p as i64 };
            if going_up {
                // Landing on the top flips a piston downward.
                *events.entry(first).or_insert(0) -= 2;
                balance += 1;
                if first < height as i64 {
                    // second landing stays inside period 2h
                    *events.entry(first + height as i64).or_insert(0) += 2;
                }
            } else {
                // Landing on the floor flips a piston upward.
                *events.entry(first).or_insert(0) += 2;
                balance -= 1;
                if first < height as i64 {
                    *events.entry(first + height as i64).or_insert(0) -= 2;
                }
            }
        }

        // Totals pass 32 bits near n * height = 10^11; the sweep runs in
        // i64 throughout.
        let mut total: i64 = positions.iter().map(|&p| p as i64).sum();
        let mut best = total;
        let mut prev = 0i64;
        for (&t, &delta) in &events {
            total += balance * (t - prev);
            best = best.max(total);
            balance += delta;
            prev = t;
        }
        best
    }
}
