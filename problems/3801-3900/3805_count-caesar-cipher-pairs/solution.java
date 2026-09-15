import java.util.HashMap;
import java.util.Map;

class Solution {

    public long countPairs(String[] words) {
        // Shifting a word by k adds k to every letter, so two words are
        // similar exactly when subtracting each word's own first letter
        // maps both onto the same normalized key: (c - word[0]) mod 26.
        Map<String, Integer> counts = new HashMap<>();
        for (String word : words) {
            char base = word.charAt(0);
            StringBuilder key = new StringBuilder(word.length());
            for (int i = 0; i < word.length(); i++) {
                key.append((char) ('a' + ((word.charAt(i) - base + 26) % 26)));
            }
            counts.merge(key.toString(), 1, Integer::sum);
        }
        // Pairs live inside one class; n <= 10^5 bounds the total by
        // n(n-1)/2 < 5 * 10^9, which is why the answer is a long.
        long pairs = 0;
        for (int c : counts.values()) {
            pairs += ((long) c * (c - 1)) / 2;
        }
        return pairs;
    }
}
