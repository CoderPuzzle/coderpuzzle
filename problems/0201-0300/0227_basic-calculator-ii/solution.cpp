class Solution {
  public:
    int calculate(string s) {
        // The expression is a plain sum of terms, each term a maximal chain
        // of */ : defer the additions and apply the operator that PRECEDED
        // the number just read, keeping fully evaluated terms on a stack.
        vector<long long> stack;
        long long num = 0;
        char op = '+';
        int last = (int)s.size() - 1;
        for (int i = 0; i <= last; i++) {
            char ch = s[i];
            if (ch >= '0' && ch <= '9') {
                num = num * 10 + (ch - '0');
            }
            // Two separate ifs: a digit in the last position must both extend
            // num and trigger the final flush (else-if would drop the term).
            if (ch == '+' || ch == '-' || ch == '*' || ch == '/' || i == last) {
                if (op == '+') {
                    stack.push_back(num);
                } else if (op == '-') {
                    stack.push_back(-num);
                } else if (op == '*') {
                    // */ combines with the term currently on top.
                    stack.back() *= num;
                } else {
                    stack.back() /= num;
                }
                op = ch;
                num = 0;
            }
        }
        // The answer is the sum of the deferred terms.
        long long total = 0;
        for (long long value : stack) {
            total += value;
        }
        return (int)total;
    }
};
