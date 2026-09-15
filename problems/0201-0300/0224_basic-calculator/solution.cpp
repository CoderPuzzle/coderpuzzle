class Solution {
  public:
    int calculate(string s) {
        // Only + and - appear, so the whole expression reduces to summing
        // signed terms: `result` is the running sum, `sign` the pending sign
        // of the next term, `num` the multi-digit number being assembled.
        long long result = 0;
        long long sign = 1;
        long long num = 0;
        vector<long long> stack;
        for (char ch : s) {
            if (ch >= '0' && ch <= '9') {
                num = num * 10 + (ch - '0');
            } else if (ch == '+') {
                // Fold the finished term in and record the next sign.
                result += sign * num;
                num = 0;
                sign = 1;
            } else if (ch == '-') {
                // A leading '-' needs no special casing: it simply leaves
                // sign = -1 for the next term or group.
                result += sign * num;
                num = 0;
                sign = -1;
            } else if (ch == '(') {
                // Save the outer context and evaluate the group afresh.
                stack.push_back(result);
                stack.push_back(sign);
                result = 0;
                sign = 1;
            } else if (ch == ')') {
                result += sign * num;
                num = 0;
                // sign was pushed last, so it pops first: apply it to the
                // inner value and add the saved outer result back.
                sign = stack.back();
                stack.pop_back();
                result = result * sign + stack.back();
                stack.pop_back();
            }
            // spaces are ignored
        }
        // Fold in the final pending term.
        return (int)(result + sign * num);
    }
};
