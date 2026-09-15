class Solution {
  public:
    int scoreOfString(string s) {
        int total = 0;
        for (int i = 1; i < static_cast<int>(s.size()); i++) {
            total += abs(s[i] - s[i - 1]);
        }
        return total;
    }
};
