import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

class Solution {

    public String[] wordBreak(String s, String[] wordDict) {
        Set<String> words = new HashSet<>();
        for (String word : wordDict) {
            words.add(word);
        }
        int n = s.length();
        // dp.get(i) holds every sentence for the prefix s.substring(0, i). Each
        // entry is built by appending one last word to a sentence of a shorter
        // prefix, so a prefix that cannot be segmented stays empty and every
        // split hanging off it is pruned before any substring is cut.
        List<List<String>> dp = new ArrayList<>();
        for (int i = 0; i <= n; ++i) {
            dp.add(new ArrayList<>());
        }
        // The empty prefix segments into exactly one sentence: the empty one.
        dp.get(0).add("");
        for (int i = 1; i <= n; ++i) {
            // The split j runs downward, so the candidate last word
            // s.substring(j, i) is one character long first and grows:
            // sentences whose last word is shorter come first, and among equal
            // last words the sentences of dp.get(j) keep their own order. That
            // is exactly the order the statement pins, emitted for free — no
            // sorting pass at the end.
            for (int j = i - 1; j >= 0; --j) {
                if (dp.get(j).isEmpty()) {
                    continue;
                }
                String last = s.substring(j, i);
                if (!words.contains(last)) {
                    continue;
                }
                if (j == 0) {
                    dp.get(i).add(last);
                } else {
                    for (String head : dp.get(j)) {
                        dp.get(i).add(head + " " + last);
                    }
                }
            }
        }
        return dp.get(n).toArray(new String[0]);
    }
}
