import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[] goodIndices(String s) {
        // A matching substring must be exactly as long as i's decimal
        // representation, so every index has just one candidate: the
        // suffix of that length ending at i. Comparing that window
        // against the digits of i decides the index — representations
        // never carry a leading zero, so a window like "01" fails
        // plainly against the real digits of i.
        List<Integer> good = new ArrayList<>();
        for (int i = 0; i < s.length(); i++) {
            String t = Integer.toString(i);
            int j = i - t.length() + 1;
            if (j >= 0 && s.regionMatches(j, t, 0, t.length())) {
                good.add(i);
            }
        }
        int[] res = new int[good.size()];
        for (int k = 0; k < res.length; k++) {
            res[k] = good.get(k);
        }
        return res;
    }
}
