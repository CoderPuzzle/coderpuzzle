class Solution {
  public:
    vector<int> constructDistancedSequence(int n) {
        // The target holds 1 once and every i >= 2 twice, exactly i apart.
        // Filling the first empty cell left to right while trying values n
        // down to 1 attempts prefixes in decreasing lexicographic
        // preference: a value is abandoned only when no valid completion
        // extends it, so the first complete sequence found is the
        // lexicographically largest.
        vector<int> result(2 * n - 1, 0);
        vector<bool> used(n + 1, false);
        fill(result, used, n, 0);
        return result;
    }

  private:
    bool fill(vector<int> &result, vector<bool> &used, int n, int pos) {
        if (pos == (int)result.size()) {
            return true;
        }
        if (result[pos] != 0) {
            return fill(result, used, n, pos + 1);
        }
        for (int value = n; value >= 1; value--) {
            if (used[value]) {
                continue;
            }
            if (value == 1) {
                result[pos] = 1;
                used[1] = true;
                if (fill(result, used, n, pos + 1)) {
                    return true;
                }
                used[1] = false;
                result[pos] = 0;
            } else if (pos + value < (int)result.size() && result[pos + value] == 0) {
                result[pos] = value;
                result[pos + value] = value;
                used[value] = true;
                if (fill(result, used, n, pos + 1)) {
                    return true;
                }
                used[value] = false;
                result[pos] = 0;
                result[pos + value] = 0;
            }
        }
        return false;
    }
};
