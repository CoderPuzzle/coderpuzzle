use std::collections::VecDeque;

impl Solution {
    // Two queues of senator indices, filled in string order: the fronts are
    // the earliest still-living senator of each party in the current
    // wrap-around pass.
    pub fn predict_party_victory(senate: String) -> String {
        let senate = senate.as_bytes();
        let n = senate.len();
        let mut radiant: VecDeque<usize> = VecDeque::new();
        let mut dire: VecDeque<usize> = VecDeque::new();
        for (i, &party) in senate.iter().enumerate() {
            if party == b'R' {
                radiant.push_back(i);
            } else {
                dire.push_back(i);
            }
        }
        // Each step the two fronts fight: the smaller index acts first, bans
        // the loser (popped for good), and re-enqueues itself at index + n,
        // its position in the next round's pass. Every fight removes one
        // senator permanently, so at most n - 1 fights decide the senate.
        while !radiant.is_empty() && !dire.is_empty() {
            let r = radiant.pop_front().unwrap();
            let d = dire.pop_front().unwrap();
            if r < d {
                radiant.push_back(r + n);
            } else {
                dire.push_back(d + n);
            }
        }
        if radiant.is_empty() {
            "Dire".to_string()
        } else {
            "Radiant".to_string()
        }
    }
}
