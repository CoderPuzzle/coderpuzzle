impl Solution {
    pub fn match_players_and_trainers(mut players: Vec<i32>, mut trainers: Vec<i32>) -> i32 {
        players.sort_unstable();
        trainers.sort_unstable();
        // Greedy: pair the weakest unmatched player with the weakest
        // unmatched trainer — optimal by an exchange argument.
        let (mut i, mut j, mut matches) = (0usize, 0usize, 0i32);
        while i < players.len() && j < trainers.len() {
            if players[i] <= trainers[j] {
                matches += 1;
                i += 1;
                j += 1;
            } else {
                // Trainer too weak for the weakest remaining player; players
                // only get stronger, so it is useless forever — skip it.
                j += 1;
            }
        }
        matches
    }
}
