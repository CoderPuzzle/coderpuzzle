class Solution {
  public:
    long long buildAndEvaluate(vector<string> &postfix) {
        vector<long long> stack;
        for (const string &tok : postfix) {
            if (tok.size() == 1 && (tok[0] == '+' || tok[0] == '-' || tok[0] == '*' || tok[0] == '/')) {
                long long b = stack.back();
                stack.pop_back();
                long long a = stack.back();
                stack.pop_back();
                char op = tok[0];
                if (op == '+') {
                    stack.push_back(a + b);
                } else if (op == '-') {
                    stack.push_back(a - b);
                } else if (op == '*') {
                    stack.push_back(a * b);
                } else {
                    stack.push_back(a / b); // C++'s / truncates toward zero.
                }
            } else {
                stack.push_back(stoll(tok));
            }
        }
        return stack.back();
    }
};
