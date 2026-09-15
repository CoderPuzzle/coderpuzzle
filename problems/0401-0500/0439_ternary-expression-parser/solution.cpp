class Solution {
  public:
    string parseTernary(string expression) {
        // Ternaries group right-to-left, so the subexpression closest to the
        // right end is always complete first. Scanning backwards therefore
        // meets every operand before the '?' that needs it.
        vector<char> stack;
        for (int i = (int)expression.size() - 1; i >= 0; i--) {
            char c = expression[i];
            if (c != '?') {
                stack.push_back(c);
            } else {
                char trueBranch = stack.back();
                stack.pop_back();
                stack.pop_back(); // the ':' separating the two branches
                char falseBranch = stack.back();
                stack.pop_back();
                // The character just left of the '?' is the condition ('T' or
                // 'F'); it belongs to this conditional, so consume it as well.
                char condition = expression[--i];
                stack.push_back(condition == 'T' ? trueBranch : falseBranch);
            }
        }
        return string(1, stack.back());
    }
};
