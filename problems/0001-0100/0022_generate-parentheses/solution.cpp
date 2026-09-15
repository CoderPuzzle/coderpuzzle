class Solution {
  public:
    vector<string> generateParenthesis(int n) {
        vector<string> result;
        string current;
        backtrack(n, current, 0, 0, result);
        return result;
    }

  private:
    void backtrack(int n, string &current, int openCount, int closeCount, vector<string> &result) {
        // Under the two guards below every leaf reached at length 2n is
        // well-formed by construction, so nothing needs re-validating.
        if ((int)current.size() == 2 * n) {
            result.push_back(current);
            return;
        }
        // Try '(' first ('(' < ')') so leaves emerge in lexicographic order;
        // it is allowed while fewer than n openings are placed.
        if (openCount < n) {
            // Push, recurse, pop: one shared string is the working storage
            // for the whole tree.
            current.push_back('(');
            backtrack(n, current, openCount + 1, closeCount, result);
            current.pop_back();
        }
        // ')' only while closings still trail openings -- appending it can
        // never make the prefix invalid.
        if (closeCount < openCount) {
            current.push_back(')');
            backtrack(n, current, openCount, closeCount + 1, result);
            current.pop_back();
        }
    }
};
