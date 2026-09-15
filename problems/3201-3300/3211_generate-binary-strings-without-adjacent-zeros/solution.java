import java.util.ArrayList;
import java.util.List;

class Solution {

    public String[] validStrings(int n) {
        // A valid string never contains "00", so the choice at each position
        // depends only on the previous character: after a 0 the next char is
        // forced to be 1, after a 1 either character may follow. Appending 0
        // right after a 0 is the only move that can ever go wrong, so pruning
        // exactly that branch keeps every surviving path valid. Trying 0
        // before 1 makes the depth-first walk emit the strings already in
        // ascending lexicographic order — no final sort needed.
        List<String> results = new ArrayList<>();
        backtrack(n, new StringBuilder(), results);
        return results.toArray(new String[0]);
    }

    private void backtrack(int n, StringBuilder current, List<String> results) {
        if (current.length() == n) {
            results.add(current.toString());
            return;
        }
        for (char ch : new char[] { '0', '1' }) {
            if (ch == '0' && current.length() > 0 && current.charAt(current.length() - 1) == '0') {
                continue; // would create "00" — prune this branch
            }
            current.append(ch);
            backtrack(n, current, results);
            current.deleteCharAt(current.length() - 1);
        }
    }
}
