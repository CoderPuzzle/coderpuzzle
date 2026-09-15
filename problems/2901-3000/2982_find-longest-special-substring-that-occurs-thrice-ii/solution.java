import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class Solution {

    public int maximumLength(String s) {
        // At 5*10^5 characters only run-length structure matters: group
        // each character's run lengths, keep the top three, and take the
        // best of the three ways to place three windows.
        List<List<Integer>> runs = new ArrayList<>();
        for (int c = 0; c < 26; c++) runs.add(new ArrayList<>());
        int n = s.length();
        int i = 0;
        while (i < n) {
            int j = i;
            while (j < n && s.charAt(j) == s.charAt(i)) j++;
            runs.get(s.charAt(i) - 'a').add(j - i);
            i = j;
        }
        int best = -1;
        for (List<Integer> rs : runs) {
            if (rs.isEmpty()) continue;
            Collections.sort(rs, Collections.reverseOrder());
            int f1 = rs.get(0);
            int f2 = rs.size() > 1 ? rs.get(1) : 0;
            int f3 = rs.size() > 2 ? rs.get(2) : 0;
            // three windows in one run / two + one / one in each;
            // a 0 candidate means this character never reaches three.
            int cand = Math.max(f1 - 2, Math.max(Math.min(f1 - 1, f2), f3));
            if (cand >= 1 && cand > best) best = cand;
        }
        return best;
    }
}
