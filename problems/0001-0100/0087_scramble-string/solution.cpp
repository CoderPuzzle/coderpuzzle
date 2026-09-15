class Solution {
  public:
    bool isScramble(string s1, string s2) {
        // Memoized recursion over string pairs. Two guards run before any
        // split work: identical strings are trivially scrambles, and a pair
        // whose letter counts differ can never be one, since swapping blocks
        // of a string only rearranges its letters.
        unordered_map<string, bool> memo;
        return solve(s1, s2, memo);
    }

  private:
    // A scramble never adds or removes a letter, so a count mismatch rules
    // the pair out before any split is tried.
    static bool sameLetters(const string &a, const string &b) {
        array<int, 26> counts{};
        for (char ch : a) {
            ++counts[ch - 'a'];
        }
        for (char ch : b) {
            --counts[ch - 'a'];
        }
        return counts == array<int, 26>{};
    }

    // The pair (a + "|" + b) keys the memo; '|' cannot occur in the inputs.
    static bool solve(const string &a, const string &b, unordered_map<string, bool> &memo) {
        if (a == b) {
            return true;
        }
        if (!sameLetters(a, b)) {
            return false;
        }
        string key = a + "|" + b;
        auto found = memo.find(key);
        if (found != memo.end()) {
            return found->second;
        }
        int n = (int)a.size();
        for (int i = 1; i < n; ++i) {
            // Keep the halves in order: the split of b sits at the same
            // index as the split of a.
            if (solve(a.substr(0, i), b.substr(0, i), memo) && solve(a.substr(i), b.substr(i), memo)) {
                memo[key] = true;
                return true;
            }
            // Swap the halves: the head of a pairs with the tail of b.
            if (solve(a.substr(0, i), b.substr(n - i), memo) && solve(a.substr(i), b.substr(0, n - i), memo)) {
                memo[key] = true;
                return true;
            }
        }
        memo[key] = false;
        return false;
    }
};
