import java.util.*;

class Solution {

    // A word qualifies iff every proper prefix chain is present. Sort once;
    // the first qualifying word of each new record length wins, and
    // lexicographic order breaks length ties for free.
    public String longestWord(String[] words) {
        Set<String> set = new HashSet<>(Arrays.asList(words));
        String best = "";
        List<String> sorted = new ArrayList<>(set);
        Collections.sort(sorted);
        for (String w : sorted) {
            if (w.length() > best.length()) {
                boolean ok = true;
                for (int i = 1; i < w.length(); i++) {
                    if (!set.contains(w.substring(0, i))) {
                        ok = false;
                        break;
                    }
                }
                if (ok) {
                    best = w;
                }
            }
        }
        return best;
    }
}
