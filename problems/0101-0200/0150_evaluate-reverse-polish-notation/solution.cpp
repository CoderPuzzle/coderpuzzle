class Solution {
  public:
    int evalRPN(vector<string> &tokens) {
        // Stack machine: operands wait on the stack until an operator arrives,
        // pops its two operands -- the second pop is the left one -- and pushes
        // the result of applying itself.
        vector<long long> stack;
        for (const string &token : tokens) {
            if (token == "+" || token == "-" || token == "*" || token == "/") {
                long long b = stack.back();
                stack.pop_back();
                long long a = stack.back();
                stack.pop_back();
                if (token == "+") {
                    stack.push_back(a + b);
                } else if (token == "-") {
                    stack.push_back(a - b);
                } else if (token == "*") {
                    stack.push_back(a * b);
                } else {
                    // C++ integer division already truncates toward zero.
                    stack.push_back(a / b);
                }
            } else {
                stack.push_back(stoll(token));
            }
        }
        return (int)stack.back();
    }
};
