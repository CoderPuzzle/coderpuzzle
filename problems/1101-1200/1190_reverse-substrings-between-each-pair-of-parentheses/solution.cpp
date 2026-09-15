class Solution {
  public:
    string reverseParentheses(string s) {
        // fragment stack mirrors the parenthesis nesting; the base fragment
        // is the outermost level and ends up holding the answer
        vector<string> stack;
        stack.push_back("");
        for (char ch : s) {
            if (ch == '(') {
                // open a fresh fragment for the new nesting level
                stack.push_back("");
            } else if (ch == ')') {
                // matching pair complete: reverse the finished fragment and
                // fold it into the level below — reversal composes with nesting
                string top = stack.back();
                stack.pop_back();
                reverse(top.begin(), top.end());
                stack.back() += top;
            } else {
                // letters accumulate in the innermost current fragment
                stack.back() += ch;
            }
        }
        return stack[0];
    }
};
