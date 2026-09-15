import java.util.ArrayList;
import java.util.List;

class Solution {

    public String[] addOperators(String num, int target) {
        List<String> results = new ArrayList<>();
        dfs(num, target, 0, 0L, 0L, new StringBuilder(), results);
        return results.toArray(new String[0]);
    }

    // num.length <= 10, so every operand is < 1e10 and any run of '*'
    // operands stays under ~1e10; the running total never exceeds ~1e11,
    // which fits comfortably in a long.
    // current is the expression's value so far; prev is the trailing
    // multiplicand chain that a later '*' binds to, not all of current.
    // The very first operand seeds both.
    private void dfs(
        String num,
        int target,
        int index,
        long prev,
        long current,
        StringBuilder expression,
        List<String> results
    ) {
        int n = num.length();
        if (index == n) {
            // The evaluation travels with the search: one comparison.
            if (current == target) {
                results.add(expression.toString());
            }
            return;
        }
        long nxt = 0;
        // Each gap decides how far the operand extends, then the operator.
        for (int end = index; end < n; end++) {
            // A '0' at num[index] admits only the single-digit operand 0
            // (lone 0 legal, 01 not), so stop extending.
            if (end != index && num.charAt(index) == '0') {
                break;
            }
            nxt = nxt * 10 + (num.charAt(end) - '0');
            int lengthBefore = expression.length();
            if (index == 0) {
                expression.append(nxt);
                dfs(num, target, end + 1, nxt, nxt, expression, results);
            } else {
                // '+'/'-' fold nxt straight into current; the chain resets
                // to nxt (or -nxt so a later '*' reverses the subtraction).
                expression.append('+').append(nxt);
                dfs(num, target, end + 1, nxt, current + nxt, expression, results);
                expression.setLength(lengthBefore);
                expression.append('-').append(nxt);
                dfs(num, target, end + 1, -nxt, current - nxt, expression, results);
                expression.setLength(lengthBefore);
                // '*' rewrites the tail in place: drop the chain's old
                // contribution, add prev * nxt.
                expression.append('*').append(nxt);
                dfs(num, target, end + 1, prev * nxt, current - prev + prev * nxt, expression, results);
            }
            expression.setLength(lengthBefore);
        }
    }
}
