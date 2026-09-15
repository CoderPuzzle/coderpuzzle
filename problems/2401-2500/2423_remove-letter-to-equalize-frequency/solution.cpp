class Solution {
  public:
    bool equalFrequency(string word) {
        // Count all 26 letters, then try removing one occurrence of each
        // present letter and test whether the surviving frequencies
        // collapse to a single value. 26 candidates x O(26) check.
        array<int, 26> freq{};
        for (char ch : word)
            ++freq[ch - 'a'];
        for (int c = 0; c < 26; ++c) {
            if (freq[c] == 0)
                continue;
            --freq[c];
            unordered_set<int> remaining;
            for (int f : freq)
                if (f > 0)
                    remaining.insert(f);
            if (remaining.size() <= 1)
                return true;
            ++freq[c];
        }
        return false;
    }
};
