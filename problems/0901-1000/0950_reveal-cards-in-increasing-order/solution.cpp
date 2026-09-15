class Solution {
  public:
    vector<int> deckRevealedIncreasing(vector<int> &deck) {
        // Build the answer by playing the reveal backwards: place the cards
        // from the largest down to the smallest; before each placement the
        // bottom card of the ordering built so far moves to the top, undoing
        // one "put the next top card at the bottom".
        vector<int> sorted_deck = deck;
        sort(sorted_deck.begin(), sorted_deck.end());
        deque<int> cards;
        for (auto card = sorted_deck.rbegin(); card != sorted_deck.rend(); ++card) {
            if (!cards.empty()) {
                cards.push_front(cards.back());
                cards.pop_back();
            }
            cards.push_front(*card);
        }
        return vector<int>(cards.begin(), cards.end());
    }
};
