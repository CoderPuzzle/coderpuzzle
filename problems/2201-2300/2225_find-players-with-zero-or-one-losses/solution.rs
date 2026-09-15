use std::collections::HashMap;

impl Solution {
    pub fn find_winners(matches: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        let mut losses: HashMap<i32, i32> = HashMap::new();
        for pair in &matches {
            let (winner, loser) = (pair[0], pair[1]);
            losses.entry(winner).or_insert(0);
            *losses.entry(loser).or_insert(0) += 1;
        }
        let mut never_lost: Vec<i32> = losses
            .iter()
            .filter(|(_, &count)| count == 0)
            .map(|(&player, _)| player)
            .collect();
        let mut lost_once: Vec<i32> = losses
            .iter()
            .filter(|(_, &count)| count == 1)
            .map(|(&player, _)| player)
            .collect();
        never_lost.sort_unstable();
        lost_once.sort_unstable();
        vec![never_lost, lost_once]
    }
}
