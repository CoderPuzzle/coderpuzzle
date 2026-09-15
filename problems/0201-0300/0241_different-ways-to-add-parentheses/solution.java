import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {

    public long[] diffWaysToCompute(String expression) {
        List<Long> values = values(expression, 0, expression.length());
        long[] results = new long[values.size()];
        for (int i = 0; i < results.length; ++i) {
            results[i] = values.get(i);
        }
        // The recursion emits each root operator's cross products in string
        // order; one ascending sort turns that into the pinned order, and
        // nothing dedupes, so equal values from different groupings survive.
        Arrays.sort(results);
        return results;
    }

    private List<Long> values(String expression, int lo, int hi) {
        List<Long> results = new ArrayList<>();
        boolean split = false;
        for (int i = lo; i < hi; ++i) {
            char op = expression.charAt(i);
            if (op != '+' && op != '-' && op != '*') {
                continue;
            }
            split = true;
            // Every operator takes its turn as the root of the expression
            // tree, so each split contributes the cross product of the
            // values its two sides can produce.
            for (long left : values(expression, lo, i)) {
                for (long right : values(expression, i + 1, hi)) {
                    if (op == '+') {
                        results.add(left + right);
                    } else if (op == '-') {
                        results.add(left - right);
                    } else {
                        results.add(left * right);
                    }
                }
            }
        }
        if (!split) {
            // A range without an operator is a single operand: its only
            // grouping is the number itself.
            results.add(Long.parseLong(expression.substring(lo, hi)));
        }
        return results;
    }
}
