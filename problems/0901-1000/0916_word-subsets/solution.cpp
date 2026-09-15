class Solution {
  public:
    vector<string> wordSubsets(vector<string> &words1, vector<string> &words2) {
        // Collapse words2 to a single requirement vector: per letter, the
        // max count any one b demands. Covering the max covers every b,
        // because each b is checked independently by the definition.
        array<int, 26> need{};
        for (const string &b : words2) {
            array<int, 26> cb = counts(b);
            for (int i = 0; i < 26; i++) {
                need[i] = max(need[i], cb[i]);
            }
        }

        // A word is universal iff its counts dominate the collapsed demand
        // everywhere; survivors keep their input order.
        vector<string> universal;
        for (const string &a : words1) {
            if (dominates(counts(a), need)) {
                universal.push_back(a);
            }
        }
        return universal;
    }

  private:
    // One slot per letter: "aba" -> [2, 1, 0, ...].
    static array<int, 26> counts(const string &s) {
        array<int, 26> c{};
        for (char ch : s) {
            c[ch - 'a']++;
        }
        return c;
    }

    static bool dominates(const array<int, 26> &have, const array<int, 26> &need) {
        for (int i = 0; i < 26; i++) {
            if (have[i] < need[i]) {
                return false;
            }
        }
        return true;
    }
};
