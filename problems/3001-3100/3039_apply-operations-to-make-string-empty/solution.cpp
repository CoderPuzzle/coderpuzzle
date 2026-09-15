class Solution {
  public:
    string lastNonEmptyString(string s) {
        array<int, 26> counts{};
        for (char ch : s) {
            ++counts[ch - 'a'];
        }
        int top = *max_element(counts.begin(), counts.end());
        array<bool, 26> taken{};
        string kept;
        for (int index = static_cast<int>(s.size()) - 1; index >= 0; --index) {
            int slot = s[index] - 'a';
            if (counts[slot] == top && !taken[slot]) {
                taken[slot] = true;
                kept.push_back(s[index]);
            }
        }
        reverse(kept.begin(), kept.end());
        return kept;
    }
};
