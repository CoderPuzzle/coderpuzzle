impl Solution {
    pub fn is_winner(player1: Vec<i32>, player2: Vec<i32>) -> i32 {
        // A turn is worth double the pins when either of the two previous
        // turns was a strike (10); each score is one linear pass.
        let score1 = Self::score(&player1);
        let score2 = Self::score(&player2);
        if score1 > score2 {
            1
        } else if score2 > score1 {
            2
        } else {
            0
        }
    }

    fn score(values: &[i32]) -> i32 {
        let mut total = 0;
        for (index, &pins) in values.iter().enumerate() {
            let start = index.saturating_sub(2);
            let doubled = values[start..index].iter().any(|&previous| previous == 10);
            total += if doubled { 2 * pins } else { pins };
        }
        total
    }
}
