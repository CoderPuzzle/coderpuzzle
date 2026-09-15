class Solution {
  public:
    vector<vector<int>> combinationSum3(int k, int n) {
        vector<vector<int>> combinations;
        vector<int> current;
        // start moves past each picked digit, so each number 1 through 9 is
        // used at most once.
        backtrack(1, k, n, current, combinations);
        return combinations;
    }

  private:
    void backtrack(int start, int slots, int remaining, vector<int> &current, vector<vector<int>> &result) {
        if (slots == 0) {
            // k digits chosen: valid only when they sum to n exactly.
            if (remaining == 0)
                result.push_back(current);
            return;
        }
        // A digit must leave slots - 1 larger digits behind, which caps it
        // at 10 - slots.
        for (int digit = start; digit <= 10 - slots; digit++) {
            // Digits grow across the loop, so the first one that overshoots
            // the remaining budget ends the loop.
            if (digit > remaining)
                break;
            current.push_back(digit);
            backtrack(digit + 1, slots - 1, remaining - digit, current, result);
            current.pop_back();
        }
    }
};
