import java.util.HashMap;
import java.util.Map;

class Solution {

    public int minimumOperationsToMakeKPeriodic(String word, int k) {
        // An operation copies one existing k-block over another, so the
        // set of block contents only shrinks and every block must end up
        // equal to some original block. Keeping the most frequent one
        // untouched, each of the other blocks is fixed by a single copy.
        Map<String, Integer> counts = new HashMap<>();
        int blocks = word.length() / k;
        int best = 0;
        for (int i = 0; i < word.length(); i += k) {
            String block = word.substring(i, i + k);
            int next = counts.merge(block, 1, Integer::sum);
            if (next > best) {
                best = next;
            }
        }
        return blocks - best;
    }
}
