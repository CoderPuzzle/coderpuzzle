use std::collections::BTreeMap;

impl Solution {
    pub fn is_n_straight_hand(hand: Vec<i32>, group_size: i32) -> bool {
        // A divisible hand must be a multiple of groupSize long.
        if hand.len() % group_size as usize != 0 {
            return false;
        }
        let mut counts: BTreeMap<i32, i64> = BTreeMap::new();
        for &v in &hand {
            *counts.entry(v).or_insert(0) += 1;
        }
        let values: Vec<i32> = counts.keys().cloned().collect();
        // Walk distinct values in sorted order: the smallest remaining
        // value must start its groups — nothing smaller exists to
        // extend downward.
        for value in values {
            let need = *counts.get(&value).unwrap_or(&0);
            if need > 0 {
                // Each of the next groupSize-1 values must supply at
                // least `need` cards; subtracting in bulk keeps this to
                // one pass per starting value.
                for nv in value..value + group_size {
                    let have = *counts.get(&nv).unwrap_or(&0);
                    if have < need {
                        return false;
                    }
                    counts.insert(nv, have - need);
                }
            }
        }
        // Exhausted values reach the loop at count 0 and skip for
        // free; consuming the smallest fully makes the rest a smaller
        // instance of the same problem.
        true
    }
}
