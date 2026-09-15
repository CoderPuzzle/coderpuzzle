use std::collections::HashMap;

impl Solution {
    pub fn combination_sum(candidates: Vec<i32>, target: i32) -> Vec<Vec<i32>> {
        // Candidate value -> position, so the ways can be reported in the
        // order the backtracking search would meet them.
        let mut position: HashMap<i32, usize> = HashMap::new();
        for (index, &value) in candidates.iter().enumerate() {
            position.insert(value, index);
        }
        // table[amount] holds every way of reaching that amount with the
        // candidates processed so far. Owing nothing has exactly one way --
        // the empty one -- which seeds the sweep.
        let bound = target as usize;
        let mut table: Vec<Vec<Vec<i32>>> = vec![Vec::new(); bound + 1];
        table[0].push(Vec::new());
        for &value in &candidates {
            let step = value as usize;
            for amount in step..=bound {
                // Extend every way that is exactly `value` short. A way may
                // already contain this candidate: that is the unlimited
                // reuse, falling out of ascending amounts within one pass.
                // (The rows are cloned so the extensions below can borrow
                // the table mutably during the sweep.)
                for way in table[amount - step].clone() {
                    let mut extended = way;
                    extended.push(value);
                    table[amount].push(extended);
                }
            }
        }
        let mut ways = table.pop().unwrap_or_default();
        // Candidate-outer passes pin each way to one order (its values grouped
        // by candidate position), but the table fills in amount order, so a
        // final lexicographic sort by position restores the discovery order.
        ways.sort_by(|a, b| {
            let shared = a.len().min(b.len());
            for i in 0..shared {
                let pa = position[&a[i]];
                let pb = position[&b[i]];
                if pa != pb {
                    return pa.cmp(&pb);
                }
            }
            a.len().cmp(&b.len())
        });
        ways
    }
}
