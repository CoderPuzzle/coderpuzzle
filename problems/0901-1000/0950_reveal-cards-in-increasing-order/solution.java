import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;

class Solution {

    public int[] deckRevealedIncreasing(int[] deck) {
        // Build the answer by playing the reveal backwards: place the cards
        // from the largest down to the smallest; before each placement the
        // bottom card of the ordering built so far moves to the top, undoing
        // one "put the next top card at the bottom".
        int[] sorted = deck.clone();
        Arrays.sort(sorted);
        Deque<Integer> cards = new ArrayDeque<>();
        for (int i = sorted.length - 1; i >= 0; i--) {
            if (!cards.isEmpty()) {
                cards.addFirst(cards.pollLast());
            }
            cards.addFirst(sorted[i]);
        }
        int[] result = new int[deck.length];
        for (int i = 0; i < result.length; i++) {
            result[i] = cards.pollFirst();
        }
        return result;
    }
}
