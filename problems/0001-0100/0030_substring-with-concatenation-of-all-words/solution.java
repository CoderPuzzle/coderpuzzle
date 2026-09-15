import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public int[] findSubstring(String s, String[] words) {
        int wordLength = words[0].length();
        // Required multiset of words; a window matches when its counts equal it.
        Map<String, Integer> target = new HashMap<>();
        for (String word : words) target.merge(word, 1, Integer::sum);
        List<Integer> result = new ArrayList<>();
        // One sliding window per alignment offset: a match can only start at a
        // position congruent to some r in 0..wordLength-1 modulo wordLength.
        for (int offset = 0; offset < wordLength; offset++) {
            Map<String, Integer> window = new HashMap<>();
            int count = 0; // Words currently inside the window.
            int left = offset;
            for (int right = offset; right + wordLength <= s.length(); right += wordLength) {
                String word = s.substring(right, right + wordLength);
                if (!target.containsKey(word)) {
                    // A non-word block can never appear in a match, so the
                    // window empties and resumes after it.
                    window.clear();
                    count = 0;
                    left = right + wordLength;
                    continue;
                }
                window.merge(word, 1, Integer::sum);
                count++;
                // Too many copies of word: release blocks from the left end
                // until the surplus is gone.
                while (window.get(word) > target.get(word)) {
                    window.merge(s.substring(left, left + wordLength), -1, Integer::sum);
                    count--;
                    left += wordLength;
                }
                if (count == words.length) {
                    result.add(left);
                    // Release the leftmost block so the window can keep sliding
                    // toward the next (possibly adjacent) match.
                    window.merge(s.substring(left, left + wordLength), -1, Integer::sum);
                    count--;
                    left += wordLength;
                }
            }
        }
        // Each offset emits ascending indices within its residue class; one
        // sort merges the classes into the pinned ascending order.
        int[] indices = new int[result.size()];
        for (int i = 0; i < indices.length; i++) indices[i] = result.get(i);
        Arrays.sort(indices);
        return indices;
    }
}
