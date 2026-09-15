class Solution {
  public:
    bool judgePoint24(vector<int> &cards) {
        // Backtracking over the multiset of remaining values. Any
        // expression tree evaluates bottom-up by combining two siblings
        // at a time, so taking each unordered pair, applying every
        // operator (both orders for '-' and '/'), and recursing on the
        // shorter list explores every expression exactly. Real division
        // makes exact equality untestable in floating point, so a lone
        // remaining value wins when it sits within EPS of 24.
        vector<double> values(cards.begin(), cards.end());
        return solve(values);
    }

  private:
    static bool solve(vector<double> &values) {
        if (values.size() == 1) {
            return abs(values[0] - 24.0) < 1e-6;
        }
        int n = (int)values.size();
        for (int i = 0; i < n; ++i) {
            for (int j = i + 1; j < n; ++j) {
                double a = values[i];
                double b = values[j];
                vector<double> rest;
                for (int k = 0; k < n; ++k) {
                    if (k != i && k != j) {
                        rest.push_back(values[k]);
                    }
                }
                double results[6] = {a + b, a - b, b - a, a * b, 0.0, 0.0};
                int count = 4;
                if (b != 0.0) {
                    results[count++] = a / b;
                }
                if (a != 0.0) {
                    results[count++] = b / a;
                }
                for (int index = 0; index < count; ++index) {
                    rest.push_back(results[index]);
                    if (solve(rest)) {
                        return true;
                    }
                    rest.pop_back();
                }
            }
        }
        return false;
    }
};
