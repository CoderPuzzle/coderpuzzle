import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class WordDistance {

    // One index list per word, built once at construction; shortest()
    // walks the two sorted lists in lockstep, always advancing the
    // smaller index — every pair that can still improve the gap gets
    // examined, so one merge finds the closest pair.
    private final Map<String, List<Integer>> positions = new HashMap<>();

    public WordDistance(String[] wordsDict) {
        // Appending left to right keeps each word's indices ascending —
        // the walk relies on both lists being sorted.
        for (int index = 0; index < wordsDict.length; ++index) {
            positions.computeIfAbsent(wordsDict[index], word -> new ArrayList<>()).add(index);
        }
    }

    public int shortest(String word1, String word2) {
        List<Integer> first = positions.get(word1);
        List<Integer> second = positions.get(word2);
        int best = Math.abs(first.get(0) - second.get(0));
        int i = 0;
        int j = 0;
        while (i < first.size() && j < second.size()) {
            int gap = Math.abs(first.get(i) - second.get(j));
            if (gap < best) {
                best = gap;
            }
            // Advancing the larger index can only widen the gap, so the
            // smaller one takes the step.
            if (first.get(i) < second.get(j)) {
                ++i;
            } else {
                ++j;
            }
        }
        return best;
    }
}
