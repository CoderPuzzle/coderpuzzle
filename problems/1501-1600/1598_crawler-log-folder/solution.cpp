class Solution {
  public:
    int minOperations(vector<string> &logs) {
        // Track only the current depth: "../" backs up (never below the
        // main folder), "./" is a no-op, and any other entry descends
        // into a named child folder. The final depth is exactly the
        // number of "../" moves needed to return to the main folder.
        int depth = 0;
        for (const string &log : logs) {
            if (log == "../") {
                depth = max(depth - 1, 0);
            } else if (log == "./") {
                continue;
            } else {
                depth++;
            }
        }
        return depth;
    }
};
