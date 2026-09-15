class Solution {
  public:
    int longestValidParentheses(string s) {
        // Stack of indices seeded with -1: a sentinel base marking the
        // position just before the current candidate stretch.
        vector<int> stack;
        stack.reserve(s.size() + 1);
        stack.push_back(-1);
        int best = 0;
        for (int i = 0; i < (int)s.size(); i++) {
            // Every '(' index is pushed, so the stack holds the still-
            // unmatched openers in order, with the base beneath them.
            if (s[i] == '(') {
                stack.push_back(i);
            } else {
                stack.pop_back();
                if (stack.empty()) {
                    // The pop emptied the stack: this ')' is unmatched and
                    // can never sit inside a valid substring, so its index
                    // becomes the new base, fencing off everything to its
                    // left.
                    stack.push_back(i);
                } else {
                    // The popped index was the '(' matching this ')'. The top
                    // now names the closest barrier before the stretch ending
                    // here, so i - stack.back() is its full length; barriers
                    // only disappear by being matched, so "()()" measures 4,
                    // not 2.
                    best = max(best, i - stack.back());
                }
            }
        }
        return best;
    }
};
