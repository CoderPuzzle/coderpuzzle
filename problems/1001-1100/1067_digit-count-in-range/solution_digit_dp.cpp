class Solution {
  public:
    // Prefix-count reduction: occurrences in [low, high] = f(high) - f(low-1).
    int digitsCount(int d, int low, int high) {
        return (int)(countUpTo(d, (long long)high) - countUpTo(d, (long long)low - 1));
    }

  private:
    long long countUpTo(int d, long long n) {
        if (n <= 0) {
            return 0;
        }
        string s = to_string(n);
        int length = s.size();
        vector<int> digits(length);
        for (int i = 0; i < length; i++) {
            digits[i] = s[i] - '0';
        }
        // Free (non-tight) suffixes recur, so they are memoized per
        // (position, started): {completions, occurrences} pairs.
        vector<array<long long, 2>> memo(length * 2, array<long long, 2>{-1, -1});
        // The all-zero completion is the number 0 and carries no
        // appearances, so the walk tallies exactly the integers 1..n.
        return solve(digits, d, 0, true, false, memo)[1];
    }

    // Each state reports how many suffix completions it admits and how many
    // appearances of d those completions contain.
    array<long long, 2> solve(const vector<int> &digits, int d, int pos, bool tight, bool started,
                              vector<array<long long, 2>> &memo) {
        if (pos == (int)digits.size()) {
            return array<long long, 2>{1, 0};
        }
        int startedIdx = started ? 1 : 0;
        if (!tight && memo[pos * 2 + startedIdx][0] >= 0) {
            return memo[pos * 2 + startedIdx];
        }
        int maxDigit = tight ? digits[pos] : 9;
        long long completions = 0;
        long long occurrences = 0;
        for (int digit = 0; digit <= maxDigit; digit++) {
            array<long long, 2> inner =
                solve(digits, d, pos + 1, tight && digit == maxDigit, started || digit > 0, memo);
            completions += inner[0];
            occurrences += inner[1];
            // Placing d here shows d in every completion below, unless it is
            // a leading zero -- those are never written.
            if (digit == d && (started || digit > 0)) {
                occurrences += inner[0];
            }
        }
        array<long long, 2> state = {completions, occurrences};
        if (!tight) {
            memo[pos * 2 + startedIdx] = state;
        }
        return state;
    }
};
