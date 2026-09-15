import java.util.ArrayList;
import java.util.List;

class Solution {

    public boolean judgePoint24(int[] cards) {
        // Backtracking over the multiset of remaining values. Any
        // expression tree evaluates bottom-up by combining two siblings
        // at a time, so taking each unordered pair, applying every
        // operator (both orders for '-' and '/'), and recursing on the
        // shorter list explores every expression exactly. Real division
        // makes exact equality untestable in floating point, so a lone
        // remaining value wins when it sits within EPS of 24.
        List<Double> values = new ArrayList<>();
        for (int card : cards) {
            values.add((double) card);
        }
        return solve(values);
    }

    private boolean solve(List<Double> values) {
        if (values.size() == 1) {
            return Math.abs(values.get(0) - 24.0) < 1e-6;
        }
        int n = values.size();
        for (int i = 0; i < n; ++i) {
            for (int j = i + 1; j < n; ++j) {
                double a = values.get(i);
                double b = values.get(j);
                List<Double> rest = new ArrayList<>();
                for (int k = 0; k < n; ++k) {
                    if (k != i && k != j) {
                        rest.add(values.get(k));
                    }
                }
                if (extend(rest, a + b) || extend(rest, a - b) || extend(rest, b - a) || extend(rest, a * b)) {
                    return true;
                }
                if (b != 0.0 && extend(rest, a / b)) {
                    return true;
                }
                if (a != 0.0 && extend(rest, b / a)) {
                    return true;
                }
            }
        }
        return false;
    }

    private boolean extend(List<Double> values, double value) {
        values.add(value);
        boolean won = solve(values);
        values.remove(values.size() - 1);
        return won;
    }
}
