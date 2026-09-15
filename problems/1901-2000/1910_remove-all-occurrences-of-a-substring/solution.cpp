class Solution {
  public:
    string removeOccurrences(string s, string part) {
        // Stream s through a survivor stack. A removal can only expose
        // characters at the top, so after each push the last part.size()
        // chars are checked and popped when they spell out part — the
        // freshly exposed top then gets its own chance on a later push.
        int m = part.size();
        string stack;
        for (char ch : s) {
            stack.push_back(ch);
            if ((int)stack.size() >= m && stack.compare(stack.size() - m, m, part) == 0) {
                stack.resize(stack.size() - m);
            }
        }
        return stack;
    }
};
