import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Deque;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public String countOfAtoms(String formula) {
        // Scan the formula once with an explicit stack of count maps. '('
        // opens a fresh map; an element name — one uppercase letter plus any
        // lowercase run — lands its count (implicit 1) in the top map; ')'
        // pops the top map, reads the optional trailing multiplier, and
        // folds every atom into the parent scaled by it. The bottom map left
        // at the end holds the totals, written in sorted name order with
        // counts of 1 omitted.
        Deque<Map<String, Long>> stack = new ArrayDeque<>();
        stack.push(new HashMap<>());
        int n = formula.length();
        int i = 0;
        while (i < n) {
            char c = formula.charAt(i);
            if (c == '(') {
                stack.push(new HashMap<>());
                i++;
            } else if (c == ')') {
                int j = i + 1;
                while (j < n && Character.isDigit(formula.charAt(j))) {
                    j++;
                }
                long mult = j > i + 1 ? Long.parseLong(formula.substring(i + 1, j)) : 1;
                Map<String, Long> group = stack.pop();
                for (Map.Entry<String, Long> e : group.entrySet()) {
                    stack.peek().merge(e.getKey(), e.getValue() * mult, Long::sum);
                }
                i = j;
            } else {
                int j = i + 1;
                while (j < n && Character.isLowerCase(formula.charAt(j))) {
                    j++;
                }
                String name = formula.substring(i, j);
                int k = j;
                while (k < n && Character.isDigit(formula.charAt(k))) {
                    k++;
                }
                long cnt = k > j ? Long.parseLong(formula.substring(j, k)) : 1;
                stack.peek().merge(name, cnt, Long::sum);
                i = k;
            }
        }
        Map<String, Long> counts = stack.pop();
        List<String> names = new ArrayList<>(counts.keySet());
        Collections.sort(names);
        StringBuilder out = new StringBuilder();
        for (String name : names) {
            long cnt = counts.get(name);
            out.append(name);
            if (cnt > 1) {
                out.append(cnt);
            }
        }
        return out.toString();
    }
}
