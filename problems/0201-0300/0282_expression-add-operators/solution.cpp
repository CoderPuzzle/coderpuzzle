class Solution {
  public:
    vector<string> addOperators(string num, int target) {
        vector<string> results;
        string expression;
        dfs(num, (long long)target, 0, 0LL, 0LL, expression, results);
        return results;
    }

  private:
    // num.length <= 10, so every operand is < 1e10 and any run of '*'
    // operands stays under ~1e10; the running total never exceeds ~1e11,
    // which fits comfortably in a long long.
    // current is the expression's value so far; prev is the trailing
    // multiplicand chain that a later '*' binds to, not all of current.
    // The very first operand seeds both.
    void dfs(const string &num, long long target, int index, long long prev, long long current, string &expression,
             vector<string> &results) {
        int n = (int)num.size();
        if (index == n) {
            // The evaluation travels with the search: one comparison.
            if (current == target) {
                results.push_back(expression);
            }
            return;
        }
        long long nxt = 0;
        // Each gap decides how far the operand extends, then the operator.
        for (int end = index; end < n; end++) {
            // A '0' at num[index] admits only the single-digit operand 0
            // (lone 0 legal, 01 not), so stop extending.
            if (end != index && num[index] == '0') {
                break;
            }
            nxt = nxt * 10 + (num[end] - '0');
            size_t lengthBefore = expression.size();
            if (index == 0) {
                expression += to_string(nxt);
                dfs(num, target, end + 1, nxt, nxt, expression, results);
            } else {
                // '+'/'-' fold nxt straight into current; the chain resets
                // to nxt (or -nxt so a later '*' reverses the subtraction).
                expression += '+';
                expression += to_string(nxt);
                dfs(num, target, end + 1, nxt, current + nxt, expression, results);
                expression.resize(lengthBefore);
                expression += '-';
                expression += to_string(nxt);
                dfs(num, target, end + 1, -nxt, current - nxt, expression, results);
                expression.resize(lengthBefore);
                // '*' rewrites the tail in place: drop the chain's old
                // contribution, add prev * nxt.
                expression += '*';
                expression += to_string(nxt);
                dfs(num, target, end + 1, prev * nxt, current - prev + prev * nxt, expression, results);
            }
            expression.resize(lengthBefore);
        }
    }
};
