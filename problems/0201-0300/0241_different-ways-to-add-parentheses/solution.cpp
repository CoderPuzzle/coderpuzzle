class Solution {
  public:
    vector<long long> diffWaysToCompute(string expression) {
        vector<long long> results = values(expression, 0, expression.size());
        // The recursion emits each root operator's cross products in string
        // order; one ascending sort turns that into the pinned order, and
        // nothing dedupes, so equal values from different groupings survive.
        sort(results.begin(), results.end());
        return results;
    }

  private:
    vector<long long> values(const string &expression, int lo, int hi) {
        vector<long long> results;
        bool split = false;
        for (int i = lo; i < hi; ++i) {
            char op = expression[i];
            if (op != '+' && op != '-' && op != '*') {
                continue;
            }
            split = true;
            // Every operator takes its turn as the root of the expression
            // tree, so each split contributes the cross product of the
            // values its two sides can produce.
            for (long long left : values(expression, lo, i)) {
                for (long long right : values(expression, i + 1, hi)) {
                    if (op == '+') {
                        results.push_back(left + right);
                    } else if (op == '-') {
                        results.push_back(left - right);
                    } else {
                        results.push_back(left * right);
                    }
                }
            }
        }
        if (!split) {
            // A range without an operator is a single operand: its only
            // grouping is the number itself.
            results.push_back(stoll(expression.substr(lo, hi - lo)));
        }
        return results;
    }
};
