import java.util.HashSet;
import java.util.Set;

class Solution {

    public boolean reportSpam(String[] message, String[] bannedWords) {
        // A word is banned or it is not: collapse bannedWords into a hash set
        // (internal duplicates collapse harmlessly). Scan the message counting
        // every occurrence that lands in the set — the same banned word twice
        // in the message counts twice — and stop as soon as two matches have
        // been seen; on a 10^5-word message the early exit can skip the rest.
        Set<String> banned = new HashSet<>();
        for (String w : bannedWords) {
            banned.add(w);
        }
        int count = 0;
        for (String word : message) {
            if (banned.contains(word)) {
                if (++count == 2) {
                    return true;
                }
            }
        }
        return false;
    }
}
