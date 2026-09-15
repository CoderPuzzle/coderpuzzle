import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Deque;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

class Solution {

    public String[] removeInvalidParentheses(String s) {
        // BFS over removal counts: every string in a level has had the
        // same number of characters deleted, so the first level holding
        // any valid string is exactly the minimum-removal answer.
        Set<String> level = new HashSet<>();
        level.add(s);
        while (true) {
            List<String> valid = new ArrayList<>();
            for (String item : level) {
                if (isValid(item)) valid.add(item);
            }
            if (!valid.isEmpty()) {
                // Sorted for deterministic output.
                Collections.sort(valid);
                return valid.toArray(new String[0]);
            }
            // Expand one more deletion; only parentheses are removed and
            // the set dedups deletions that produce the same string.
            Set<String> next = new HashSet<>();
            for (String item : level) {
                for (int i = 0; i < item.length(); i++) {
                    char ch = item.charAt(i);
                    if (ch == '(' || ch == ')') {
                        next.add(item.substring(0, i) + item.substring(i + 1));
                    }
                }
            }
            level = next;
        }
    }

    private boolean isValid(String str) {
        // Balance scan: fail as soon as a ')' has no '(' to match,
        // and require the counter to end back at zero.
        int count = 0;
        for (int i = 0; i < str.length(); i++) {
            char ch = str.charAt(i);
            if (ch == '(') count++;
            else if (ch == ')') {
                count--;
                if (count < 0) return false;
            }
        }
        return count == 0;
    }
}
