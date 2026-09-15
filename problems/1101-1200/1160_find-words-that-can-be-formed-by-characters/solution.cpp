class Solution {
  public:
    int countCharacters(vector<string> &words, string chars) {
        int have[26] = {};
        for (char ch : chars)
            have[ch - 'a']++;
        int total = 0;
        for (const string &word : words) {
            int need[26] = {};
            for (char ch : word)
                need[ch - 'a']++;
            bool ok = true;
            for (int i = 0; i < 26; ++i) {
                if (need[i] > have[i]) {
                    ok = false;
                    break;
                }
            }
            if (ok)
                total += (int)word.size();
        }
        return total;
    }
};
