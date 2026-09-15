import java.util.*;

class Solution {

    String booth(String s) {
        if (s.isEmpty()) return s;
        String z = s + s;
        int n = s.length(),
            i = 0,
            j = 1,
            k = 0;
        while (i < n && j < n && k < n) {
            if (z.charAt(i + k) == z.charAt(j + k)) {
                k++;
                continue;
            }
            if (z.charAt(i + k) > z.charAt(j + k)) {
                i = i + k + 1;
                if (i == j) i++;
            } else {
                j = j + k + 1;
                if (i == j) j++;
            }
            k = 0;
        }
        int p = Math.min(i, j);
        return z.substring(p, p + n);
    }

    public int minimumGroups(String[] words) {
        Set<String> q = new HashSet<>();
        for (String w : words) {
            StringBuilder a = new StringBuilder(),
                b = new StringBuilder();
            for (int i = 0; i < w.length(); i++) (i % 2 == 0 ? a : b).append(w.charAt(i));
            q.add(booth(a.toString()) + "#" + booth(b.toString()));
        }
        return q.size();
    }
}
