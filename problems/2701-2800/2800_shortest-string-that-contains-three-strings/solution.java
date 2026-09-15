import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

class Solution {

    public String minimumString(String a, String b, String c) {
        // A word already contained in another never extends a superstring,
        // so it is dropped (duplicates collapse with it).
        Set<String> unique = new LinkedHashSet<>(Arrays.asList(a, b, c));
        List<String> words = new ArrayList<>();
        for (String w : unique) {
            boolean contained = false;
            for (String t : unique) {
                if (!t.equals(w) && t.contains(w)) {
                    contained = true;
                    break;
                }
            }
            if (!contained) {
                words.add(w);
            }
        }
        if (words.size() == 1) {
            return words.get(0);
        }

        String best = "";
        for (int i = 0; i < words.size(); i++) {
            for (int j = 0; j < words.size(); j++) {
                if (j == i) {
                    continue;
                }
                // Chain the words in the order i -> j -> (the remaining one);
                // every optimal superstring lines up its words in some such
                // order with each pair joined on their full overlap.
                String cur = merge(words.get(i), words.get(j));
                for (int k = 0; k < words.size(); k++) {
                    if (k != i && k != j) {
                        cur = merge(cur, words.get(k));
                    }
                }
                if (
                    best.isEmpty() ||
                    cur.length() < best.length() ||
                    (cur.length() == best.length() && cur.compareTo(best) < 0)
                ) {
                    best = cur;
                }
            }
        }
        return best;
    }

    private String merge(String x, String y) {
        // Largest k whose x-suffix equals y's prefix; k = 0 (plain
        // concatenation) always works as the fallback.
        int limit = Math.min(x.length(), y.length());
        for (int k = limit; k > 0; k--) {
            if (x.endsWith(y.substring(0, k))) {
                return x + y.substring(k);
            }
        }
        return x + y;
    }
}
