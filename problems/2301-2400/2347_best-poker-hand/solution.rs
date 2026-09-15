use std::collections::HashMap;

impl Solution {
    pub fn best_hand(ranks: Vec<i32>, suits: Vec<String>) -> String {
        // The hand types rank strictly best to worst, so the first condition
        // that holds decides: uniform suit is a flush; otherwise the largest
        // rank multiplicity picks Three of a Kind (>= 3), Pair (2), or High
        // Card. A count of 4 still qualifies as three of a kind.
        if suits.iter().all(|suit| *suit == suits[0]) {
            return "Flush".to_string();
        }
        let mut counts: HashMap<i32, i32> = HashMap::new();
        for rank in ranks {
            *counts.entry(rank).or_insert(0) += 1;
        }
        let best = counts.values().copied().max().unwrap();
        if best >= 3 {
            return "Three of a Kind".to_string();
        }
        if best == 2 {
            return "Pair".to_string();
        }
        "High Card".to_string()
    }
}
