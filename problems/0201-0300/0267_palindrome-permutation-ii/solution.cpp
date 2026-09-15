class Solution {
  public:
    vector<string> generatePalindromes(string s) {
        vector<int> counts(26, 0);
        for (char letter : s)
            counts[letter - 'a']++;
        // A palindrome pairs up every letter except at most one middle
        // occupant, so a second odd count means no palindromic arrangement.
        string middle;
        for (int i = 0; i < 26; ++i) {
            if (counts[i] % 2) {
                if (!middle.empty())
                    return {};
                middle.push_back('a' + i);
            }
        }
        // Quota for the left half, one bucket per distinct letter. Choosing
        // buckets rather than positions makes every half distinct by
        // construction — the duplicate branches a naive per-position
        // permutation would explore never arise.
        vector<int> half(26, 0);
        for (int i = 0; i < 26; ++i)
            half[i] = counts[i] / 2;
        vector<string> results;
        string current;
        walk(half, s.size() / 2, middle, current, results);
        return results;
    }

  private:
    void walk(vector<int> &half, int target, const string &middle, string &current, vector<string> &results) {
        // Half complete: mirror it around the odd letter, if there is one.
        if ((int)current.size() == target) {
            string right(current.rbegin(), current.rend());
            results.push_back(current + middle + right);
            return;
        }
        // Letters ascend, so earlier positions vary slowest and the
        // palindromes come out in ascending lexicographic order.
        for (int i = 0; i < 26; ++i) {
            if (half[i] == 0)
                continue;
            half[i]--;
            current.push_back('a' + i);
            walk(half, target, middle, current, results);
            current.pop_back();
            half[i]++;
        }
    }
};
