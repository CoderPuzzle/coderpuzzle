import java.util.ArrayList;
import java.util.List;

class Solution {

    public String[] twoEditWords(String[] queries, String[] dictionary) {
        // A query survives iff some dictionary word differs in at most two
        // positions; the strings are equal-length, so a position count is all
        // it takes.
        List<String> result = new ArrayList<>();
        for (String q : queries) {
            for (String d : dictionary) {
                if (edits(q, d) <= 2) {
                    result.add(q);
                    break;
                }
            }
        }
        return result.toArray(new String[0]);
    }

    private static int edits(String a, String b) {
        int count = 0;
        for (int i = 0; i < a.length(); ++i) {
            if (a.charAt(i) != b.charAt(i)) {
                ++count;
            }
        }
        return count;
    }
}
