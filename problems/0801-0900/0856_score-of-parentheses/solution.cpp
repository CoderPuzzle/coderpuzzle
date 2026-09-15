class Solution {
  public:
    int scoreOfParentheses(string s) {
        // The rules only add siblings and double wrapped wholes, so every
        // score is a sum over "()" cores, each worth 2^d where d is the
        // number of pairs open around it. One sweep keeps the open-paren
        // depth; a ')' whose predecessor is '(' has just closed a core, and
        // the post-decrement depth counts its wrappers — add 1 << depth.
        int score = 0;
        int depth = 0;
        for (size_t i = 0; i < s.size(); ++i) {
            char c = s[i];
            if (c == '(') {
                ++depth;
            } else {
                --depth;
                if (s[i - 1] == '(') {
                    score += 1 << depth;
                }
            }
        }
        return score;
    }
};
