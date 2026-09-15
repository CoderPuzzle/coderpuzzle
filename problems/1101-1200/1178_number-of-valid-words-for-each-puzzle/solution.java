import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public int[] findNumOfValidWords(String[] words, String[] puzzles) {
        Map<Integer, Integer> counts = new HashMap<>();
        // bucket words by their distinct-letter mask (repeats are irrelevant)
        // so each puzzle avoids scanning all words
        for (String w : words) {
            int m = 0;
            for (int t = 0; t < w.length(); t++) m |= 1 << (w.charAt(t) - 'a');
            counts.merge(m, 1, Integer::sum);
        }

        int[] answer = new int[puzzles.length];
        for (int p = 0; p < puzzles.length; p++) {
            String puzzle = puzzles[p];
            // a valid word mask must contain the puzzle's first letter
            int first = 1 << (puzzle.charAt(0) - 'a');
            int puzzleMask = 0;
            for (int t = 0; t < puzzle.length(); t++) puzzleMask |= 1 << (puzzle.charAt(t) - 'a');
            int total = 0;
            // enumerate every submask of the 7-letter puzzle mask (at most
            // 127); sub = (sub - 1) & puzzleMask walks them all in order
            int sub = puzzleMask;
            while (sub != 0) {
                if ((sub & first) != 0) {
                    Integer c = counts.get(sub);
                    if (c != null) total += c;
                }
                sub = (sub - 1) & puzzleMask;
            }
            answer[p] = total;
        }
        return answer;
    }
}
