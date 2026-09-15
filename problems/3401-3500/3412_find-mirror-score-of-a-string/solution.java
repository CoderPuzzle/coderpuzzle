import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public long calculateScore(String s) {
        // One stack of unmarked indices per letter: the closest unmarked
        // mirror candidate is always the most recently pushed one.
        Deque<Integer>[] stacks = new ArrayDeque[26];
        for (int c = 0; c < 26; ++c) {
            stacks[c] = new ArrayDeque<>();
        }
        long score = 0;
        for (int i = 0; i < s.length(); ++i) {
            int c = s.charAt(i) - 'a';
            Deque<Integer> mirror = stacks[25 - c];
            if (!mirror.isEmpty()) {
                // Match with the nearest unmarked mirror and mark both.
                score += i - mirror.pop();
            } else {
                stacks[c].push(i);
            }
        }
        return score;
    }
}
