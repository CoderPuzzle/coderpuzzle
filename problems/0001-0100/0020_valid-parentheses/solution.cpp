class Solution {
  public:
    bool isValid(string s) {
        vector<char> stack;
        for (char ch : s) {
            // Openers are pushed: the most recently opened bracket is always
            // the one that must close next -- a LIFO discipline the stack
            // models directly.
            if (ch == '(' || ch == '[' || ch == '{') {
                stack.push_back(ch);
            } else {
                // Map the closer to the opener it requires.
                char open = ch == ')' ? '(' : ch == ']' ? '[' : '{';
                // An empty stack means nothing is open, so the closer is
                // unmatched; otherwise the top must equal the required opener.
                if (stack.empty() || stack.back() != open) {
                    return false;
                }
                stack.pop_back();
            }
        }
        // Valid exactly when nothing is left open; catches inputs like "(((".
        return stack.empty();
    }
};
