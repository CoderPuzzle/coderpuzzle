use std::collections::HashMap;

impl Solution {
    pub fn nim_game(piles: Vec<i32>) -> bool {
        // Game-tree DP: the mover with no stones left to take loses, and a
        // position is won exactly when some move — pick a pile, reduce it —
        // strands the opponent on a lost position. Memoize on the sorted
        // pile vector: pile order never changes the move options, so every
        // distinct position is decided exactly once.
        let mut state = piles;
        state.sort_unstable();
        let mut memo: HashMap<Vec<i32>, bool> = HashMap::new();
        wins(&state, &mut memo)
    }
}

// wins reports whether the player to move from the sorted position state
// can force a win, memoized on that canonical shape.
fn wins(state: &[i32], memo: &mut HashMap<Vec<i32>, bool>) -> bool {
    if let Some(&known) = memo.get(state) {
        return known;
    }
    for i in 0..state.len() {
        for take in 1..=state[i] {
            let mut nxt = state.to_vec();
            nxt[i] -= take;
            nxt.sort_unstable();
            if !wins(&nxt, memo) {
                memo.insert(state.to_vec(), true);
                return true;
            }
        }
    }
    memo.insert(state.to_vec(), false);
    false
}
