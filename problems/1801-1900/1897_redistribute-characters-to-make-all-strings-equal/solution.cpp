class Solution {
  public:
    // Pool all letters; n equal strings need each count % n == 0.
    bool makeEqual(vector<string> &words) {
        int n = words.size();
        array<int, 26> counts{};
        for (const string &w : words) {
            for (char ch : w)
                counts[ch - 'a']++;
        }
        for (int c : counts) {
            if (c % n != 0)
                return false;
        }
        return true;
    }
};
