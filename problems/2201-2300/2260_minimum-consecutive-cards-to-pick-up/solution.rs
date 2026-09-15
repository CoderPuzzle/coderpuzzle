use std::collections::HashMap;

impl Solution {
    pub fn minimum_card_pickup(cards: Vec<i32>) -> i32 {
        let mut last: HashMap<i32, usize> = HashMap::new();
        let mut best: Option<usize> = None;
        for (i, &v) in cards.iter().enumerate() {
            if let Some(&prev) = last.get(&v) {
                let gap = i - prev + 1;
                if best.is_none() || gap < best.unwrap() {
                    best = Some(gap);
                }
            }
            last.insert(v, i);
        }
        match best {
            Some(g) => g as i32,
            None => -1,
        }
    }
}
