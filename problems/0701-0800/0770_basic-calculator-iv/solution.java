import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Deque;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public String[] basicCalculatorIV(String expression, String[] evalvars, int[] evalints) {
        // One scan, two stacks: a stack of polynomials — each a map from a
        // term (its variables, sorted, joined by '*'; "" is the constant
        // term) to its coefficient — and a stack of pending operators.
        // Every operand pushes a one-term polynomial; a variable listed in
        // evalvars (or a number) becomes the constant term. '+' and '-'
        // drain every pending operator down to '(', '*' drains only '*',
        // and ')' drains to its matching '(' — precedence and brackets in
        // four rules. Multiplying pairs every term of both sides, merging
        // the two variable lists into one sorted list; adding merges
        // coefficients of equal terms. Zero terms drop out at the end,
        // where terms print degree-descending first and lexicographic
        // within a degree, coefficient left of its variables.
        Map<String, Integer> evalmap = new HashMap<>();
        for (int k = 0; k < evalvars.length; k++) {
            evalmap.put(evalvars[k], evalints[k]);
        }
        Deque<Map<String, Long>> polys = new ArrayDeque<>();
        Deque<Character> ops = new ArrayDeque<>();
        int n = expression.length();
        int i = 0;
        while (i < n) {
            char ch = expression.charAt(i);
            if (ch == ' ') {
                i++;
            } else if (ch == '(') {
                ops.push(ch);
                i++;
            } else if (ch == ')') {
                while (ops.peek() != '(') {
                    apply(polys, ops);
                }
                ops.pop();
                i++;
            } else if (ch == '+' || ch == '-' || ch == '*') {
                while (!ops.isEmpty() && (ch == '*' ? ops.peek() == '*' : ops.peek() != '(')) {
                    apply(polys, ops);
                }
                ops.push(ch);
                i++;
            } else {
                int j = i;
                while (j < n && Character.isLetterOrDigit(expression.charAt(j))) {
                    j++;
                }
                String token = expression.substring(i, j);
                Map<String, Long> poly = new HashMap<>();
                if (Character.isDigit(token.charAt(0))) {
                    poly.put("", Long.parseLong(token));
                } else if (evalmap.containsKey(token)) {
                    poly.put("", evalmap.get(token).longValue());
                } else {
                    poly.put(token, 1L);
                }
                polys.push(poly);
                i = j;
            }
        }
        while (!ops.isEmpty()) {
            apply(polys, ops);
        }
        Map<String, Long> result = polys.pop();
        List<String> keys = new ArrayList<>();
        for (Map.Entry<String, Long> entry : result.entrySet()) {
            if (entry.getValue() != 0) {
                keys.add(entry.getKey());
            }
        }
        keys.sort((a, b) -> {
            int byDegree = Integer.compare(degree(b), degree(a));
            return byDegree != 0 ? byDegree : a.compareTo(b);
        });
        String[] out = new String[keys.size()];
        for (int k = 0; k < keys.size(); k++) {
            String key = keys.get(k);
            long coef = result.get(key);
            out[k] = key.isEmpty() ? Long.toString(coef) : coef + "*" + key;
        }
        return out;
    }

    private static void apply(Deque<Map<String, Long>> polys, Deque<Character> ops) {
        char op = ops.pop();
        Map<String, Long> right = polys.pop();
        Map<String, Long> left = polys.pop();
        if (op == '*') {
            Map<String, Long> product = new HashMap<>();
            for (Map.Entry<String, Long> leftEntry : left.entrySet()) {
                String[] lvars = splitTerm(leftEntry.getKey());
                for (Map.Entry<String, Long> rightEntry : right.entrySet()) {
                    String[] merged = new String[lvars.length + splitTerm(rightEntry.getKey()).length];
                    int m = 0;
                    for (String v : lvars) {
                        merged[m++] = v;
                    }
                    for (String v : splitTerm(rightEntry.getKey())) {
                        merged[m++] = v;
                    }
                    Arrays.sort(merged);
                    String key = String.join("*", merged);
                    product.merge(key, leftEntry.getValue() * rightEntry.getValue(), Long::sum);
                }
            }
            polys.push(product);
        } else {
            long sign = op == '+' ? 1 : -1;
            for (Map.Entry<String, Long> entry : right.entrySet()) {
                left.merge(entry.getKey(), sign * entry.getValue(), Long::sum);
            }
            polys.push(left);
        }
    }

    private static String[] splitTerm(String key) {
        return key.isEmpty() ? new String[0] : key.split("\\*");
    }

    private static int degree(String key) {
        return key.isEmpty() ? 0 : key.split("\\*").length;
    }
}
