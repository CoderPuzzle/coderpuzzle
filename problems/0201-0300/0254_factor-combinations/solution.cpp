class Solution {
  public:
    vector<vector<int>> getFactors(int n) {
        vector<vector<int>> combinations;
        vector<int> current;
        backtrack(n, 2, current, combinations);
        // Left-to-right growth emits each length group in lexicographic order
        // but interleaves the groups; the pinned display wants fewest factors
        // first, so reassemble by (length, lexicographic).
        auto byLengthThenLex = [](const vector<int> &a, const vector<int> &b) {
            if (a.size() != b.size())
                return a.size() < b.size();
            return a < b;
        };
        sort(combinations.begin(), combinations.end(), byLengthThenLex);
        return combinations;
    }

  private:
    void backtrack(int remaining, int start, vector<int> &current, vector<vector<int>> &combinations) {
        for (int factor = start; (long long)factor * factor <= remaining; factor++) {
            if (remaining % factor != 0)
                continue;
            // factor closes a combination: the cofactor remaining / factor is
            // at least factor, so both stay in [2, n - 1] and the list stays
            // ascending.
            current.push_back(factor);
            current.push_back(remaining / factor);
            combinations.push_back(current);
            current.pop_back();
            // Split the cofactor further; the new start stays at factor so
            // the next factor is at least as large.
            backtrack(remaining / factor, factor, current, combinations);
            current.pop_back();
        }
    }
};
