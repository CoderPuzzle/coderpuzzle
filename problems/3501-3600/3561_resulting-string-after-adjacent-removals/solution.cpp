class Solution {
  public:
    string resultingString(string s) {
        // Left-to-right stack: a fresh character cancels the top when the
        // two are circular-adjacent; the pair exposed by a pop is exactly
        // the next pair the leftmost-first rule would remove.
        string stack;
        stack.reserve(s.size());
        for (char ch : s) {
            if (!stack.empty()) {
                int diff = (stack.back() - ch + 26) % 26;
                if (diff == 1 || diff == 25) {
                    stack.pop_back();
                    continue;
                }
            }
            stack.push_back(ch);
        }
        return stack;
    }
};
