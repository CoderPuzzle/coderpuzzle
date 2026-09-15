use std::collections::VecDeque;

impl Solution {
    pub fn deck_revealed_increasing(mut deck: Vec<i32>) -> Vec<i32> {
        // Build the answer by playing the reveal backwards: place the cards
        // from the largest down to the smallest; before each placement the
        // bottom card of the ordering built so far moves to the top, undoing
        // one "put the next top card at the bottom".
        deck.sort_unstable();
        let mut cards: VecDeque<i32> = VecDeque::new();
        for &card in deck.iter().rev() {
            if let Some(bottom) = cards.pop_back() {
                cards.push_front(bottom);
            }
            cards.push_front(card);
        }
        cards.into_iter().collect()
    }
}
