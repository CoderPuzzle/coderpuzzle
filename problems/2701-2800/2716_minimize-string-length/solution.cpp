class Solution {
  public:
    int minimizedStringLength(string s) {
        vector<bool> seen(26, false);
        for (char ch : s) {
            seen[ch - 'a'] = true;
        }
        int count = 0;
        for (bool present : seen) {
            if (present) {
                count++;
            }
        }
        return count;
    }
};
