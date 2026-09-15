class Solution {
  public:
    int maxDepth(string s) {
        // s is guaranteed to be a VPS, so a running depth counter suffices:
        // '(' increments it, ')' decrements it, everything else is skipped.
        int depth = 0;
        int best = 0;
        for (char ch : s) {
            if (ch == '(') {
                depth++;
                best = max(best, depth);
            } else if (ch == ')') {
                depth--;
            }
        }
        return best;
    }
};
