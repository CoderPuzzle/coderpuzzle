import java.util.ArrayList;
import java.util.List;

class Solution {

    // A word qualifies exactly when x occurs in it; String.contains
    // answers that in one call, so a single pass over words collects the
    // matching indices in order.
    public int[] findWordsContaining(String[] words, String x) {
        List<Integer> hits = new ArrayList<>();
        for (int i = 0; i < words.length; i++) {
            if (words[i].contains(x)) hits.add(i);
        }
        int[] result = new int[hits.size()];
        for (int i = 0; i < hits.size(); i++) result[i] = hits.get(i);
        return result;
    }
}
