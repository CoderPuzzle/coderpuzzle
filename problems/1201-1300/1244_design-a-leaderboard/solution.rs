use std::collections::HashMap;

pub struct Leaderboard {
    scores: HashMap<i32, i64>,
}

impl Leaderboard {
    pub fn new() -> Self {
        Leaderboard { scores: HashMap::new() }
    }

    // The design replay dispatches by the action name, so the method keeps
    // LeetCode's camelCase spelling (as the landed design bundles do).
    pub fn addScore(&mut self, playerId: i32, score: i32) {
        *self.scores.entry(playerId).or_insert(0) += score as i64;
    }

    pub fn top(&mut self, k: i32) -> i64 {
        // Removing on reset (not zeroing) keeps zeros out of this sort.
        let mut values: Vec<i64> = self.scores.values().copied().collect();
        values.sort_unstable_by(|a, b| b.cmp(a));
        values.iter().take(k as usize).sum()
    }

    pub fn reset(&mut self, playerId: i32) {
        self.scores.remove(&playerId);
    }
}
