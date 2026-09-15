class Solution {
  public:
    int calculateTime(string keyboard, string word) {
        int index[26];
        for (int i = 0; i < 26; ++i)
            index[keyboard[i] - 'a'] = i;
        int total = 0;
        int position = 0;
        for (char ch : word) {
            int target = index[ch - 'a'];
            total += abs(target - position);
            position = target;
        }
        return total;
    }
};
