class Solution {
  public:
    string removeVowels(string s) {
        string kept;
        kept.reserve(s.size());
        for (char c : s) {
            if (c != 'a' && c != 'e' && c != 'i' && c != 'o' && c != 'u')
                kept.push_back(c);
        }
        return kept;
    }
};
