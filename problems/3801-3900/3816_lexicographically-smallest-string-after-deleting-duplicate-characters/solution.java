import java.util.ArrayList;
import java.util.List;

class Solution {

    public String lexSmallestAfterDeletion(String s) {
        // A letter occurring once can never be deleted, and any letter can
        // be deleted down to a single occurrence, so the reachable strings
        // are exactly the subsequences that keep every distinct letter.
        // Build the smallest one letter by letter: take the smallest letter
        // whose earliest remaining occurrence still leaves every
        // not-yet-taken letter an occurrence after it.
        int n = s.length();
        List<List<Integer>> pos = new ArrayList<>();
        for (int c = 0; c < 26; c++) {
            pos.add(new ArrayList<>());
        }
        for (int i = 0; i < n; i++) {
            pos.get(s.charAt(i) - 'a').add(i);
        }
        List<Integer> todo = new ArrayList<>();
        for (int c = 0; c < 26; c++) {
            if (!pos.get(c).isEmpty()) {
                todo.add(c);
            }
        }
        int[] ptr = new int[26];
        StringBuilder out = new StringBuilder();
        int p = -1;
        while (!todo.isEmpty()) {
            // Two smallest last-occurrence deadlines among needed letters.
            int m1 = n;
            int m2 = n;
            int d1 = -1;
            for (int c : todo) {
                int lc = pos.get(c).get(pos.get(c).size() - 1);
                if (lc < m1) {
                    m2 = m1;
                    m1 = lc;
                    d1 = c;
                } else if (lc < m2) {
                    m2 = lc;
                }
            }
            for (int c = 0; c < 26; c++) {
                List<Integer> lst = pos.get(c);
                int j = ptr[c];
                while (j < lst.size() && lst.get(j) <= p) {
                    j++;
                }
                ptr[c] = j;
                if (j == lst.size()) {
                    continue;
                }
                // Taking occurrence q must not strand a needed letter.
                int q = lst.get(j);
                int lim = c == d1 ? m2 : m1;
                if (q < lim) {
                    out.append((char) ('a' + c));
                    p = q;
                    todo.remove((Integer) c);
                    break;
                }
            }
        }
        return out.toString();
    }
}
