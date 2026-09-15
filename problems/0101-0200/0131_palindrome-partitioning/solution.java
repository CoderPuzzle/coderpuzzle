import java.util.ArrayList;
import java.util.List;

class Solution {

    public String[][] partition(String s) {
        int n = s.length();
        // Table of palindrome verdicts for every interval s[i..j].
        boolean[][] isPal = new boolean[n][n];
        // Reverse i ensures the inner interval is computed before any outer
        // interval that reads it.
        for (int i = n - 1; i >= 0; i--) {
            for (int j = i; j < n; j++) {
                // Palindrome iff ends match and the interior is empty or pal.
                if (s.charAt(i) == s.charAt(j) && (j - i < 2 || isPal[i + 1][j - 1])) {
                    isPal[i][j] = true;
                }
            }
        }

        List<List<String>> result = new ArrayList<>();
        List<String> current = new ArrayList<>();
        backtrack(s, 0, isPal, current, result);

        String[][] output = new String[result.size()][];
        for (int i = 0; i < result.size(); i++) {
            List<String> row = result.get(i);
            output[i] = row.toArray(new String[0]);
        }
        return output;
    }

    private void backtrack(String s, int start, boolean[][] isPal, List<String> current, List<List<String>> result) {
        if (start == s.length()) {
            // The pieces tile the whole string: snapshot the partition.
            result.add(new ArrayList<>(current));
            return;
        }
        // Increasing `end` yields shorter first pieces before longer ones,
        // producing the required output order.
        for (int end = start; end < s.length(); end++) {
            if (isPal[start][end]) {
                current.add(s.substring(start, end + 1));
                backtrack(s, end + 1, isPal, current, result);
                current.remove(current.size() - 1);
            }
        }
    }
}
