use std::collections::HashMap;

impl Solution {
    pub fn can_win(currentState: String) -> bool {
        // The player to move wins exactly when some flip of a "++" hands the
        // opponent a position from which they cannot win; a position with no
        // "++" left is a loss. A flip never crosses a '-', so the game
        // decomposes into independent '+'-runs: memoize on the sorted lengths
        // of the live runs (>= 2), which alone decide the position.
        let runs: Vec<u8> = currentState
            .split('-')
            .filter(|run| !run.is_empty())
            .map(|run| run.len() as u8)
            .collect();
        let mut memo: HashMap<Vec<u8>, bool> = HashMap::new();
        Self::can_win_runs(&runs, &mut memo)
    }

    fn can_win_runs(runs: &[u8], memo: &mut HashMap<Vec<u8>, bool>) -> bool {
        let mut live: Vec<u8> = runs.iter().copied().filter(|&length| length >= 2).collect();
        live.sort_unstable();
        if let Some(&won) = memo.get(&live) {
            return won;
        }
        let mut winner = false;
        for index in 0..live.len() {
            if winner {
                break;
            }
            let length = live[index];
            let mut others = live.clone();
            others.remove(index);
            // Flipping spot i inside `length` leaves runs i and length-2-i;
            // the mirror split makes the same successor, so half the range.
            for i in 0..=(length - 2) / 2 {
                if winner {
                    break;
                }
                let mut next = others.clone();
                if i >= 2 {
                    next.push(i);
                }
                if length - 2 - i >= 2 {
                    next.push(length - 2 - i);
                }
                if !Self::can_win_runs(&next, memo) {
                    winner = true;
                }
            }
        }
        memo.insert(live, winner);
        winner
    }
}
