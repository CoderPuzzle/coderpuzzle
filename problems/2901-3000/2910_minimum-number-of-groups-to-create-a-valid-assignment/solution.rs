use std::collections::HashMap;

impl Solution {
    pub fn min_groups_for_valid_assignment(balls: Vec<i32>) -> i32 {
        // Some box size s must make every box hold s or s + 1 balls, and the
        // value with the fewest copies bounds s by its frequency. For each
        // candidate s, pack each frequency f into f / (s + 1) boxes when it
        // divides evenly, one more box when the remainder can be absorbed by
        // shrinking that many full boxes, or fail; the cheapest feasible s
        // wins.
        let mut counts: HashMap<i32, i64> = HashMap::new();
        for &ball in &balls {
            *counts.entry(ball).or_insert(0) += 1;
        }
        let mut freqs: Vec<i64> = counts.into_values().collect();
        let mut smallest = balls.len() as i64;
        for &f in &freqs {
            smallest = smallest.min(f);
        }
        let mut best = balls.len() as i64;
        for size in 1..=smallest {
            let mut total = 0i64;
            let mut ok = true;
            for &f in &freqs {
                let big = f / (size + 1);
                let rest = f % (size + 1);
                if rest != 0 {
                    if size - rest > big {
                        ok = false;
                        break;
                    }
                    total += 1;
                }
                total += big;
            }
            if ok && total < best {
                best = total;
            }
        }
        best as i32
    }
}
