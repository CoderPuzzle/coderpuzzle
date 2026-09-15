import java.util.HashMap;
import java.util.Map;

class Solution {

    public int similarPairs(String[] words) {
        // Similarity ignores multiplicity and order: a 26-bit signature with
        // one bit per letter identifies each character set, and merging into
        // the count map after reading the old value pairs the word with
        // every earlier occurrence of the same set.
        Map<Integer, Integer> counts = new HashMap<>();
        int total = 0;
        for (String word : words) {
            int signature = 0;
            for (int i = 0; i < word.length(); ++i) {
                signature |= 1 << (word.charAt(i) - 'a');
            }
            total += counts.getOrDefault(signature, 0);
            counts.merge(signature, 1, Integer::sum);
        }
        return total;
    }
}
