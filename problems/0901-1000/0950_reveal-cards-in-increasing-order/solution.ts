function deckRevealedIncreasing(deck: number[]): number[] {
    // Build the answer by playing the reveal backwards: place the cards
    // from the largest down to the smallest; before each placement the
    // bottom card of the ordering built so far moves to the top, undoing
    // one "put the next top card at the bottom". n <= 1000, so the array
    // head insert (unshift) is a harmless O(n) deque stand-in.
    const sorted = [...deck].sort((a, b) => a - b);
    const cards: number[] = [];
    for (let i = sorted.length - 1; i >= 0; i--) {
        const bottom = cards.pop();
        if (bottom !== undefined) {
            cards.unshift(bottom);
        }
        cards.unshift(sorted[i]);
    }
    return cards;
}
