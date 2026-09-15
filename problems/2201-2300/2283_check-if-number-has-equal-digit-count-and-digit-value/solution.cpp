class Solution {
  public:
    bool digitCount(string num) {
        // One counting pass fills a fixed ten-slot tally; every index then
        // checks the tally against the digit recorded there.
        int counts[10] = {};
        for (char character : num)
            counts[character - '0']++;
        for (int i = 0; i < static_cast<int>(num.size()); i++) {
            if (counts[i] != num[i] - '0')
                return false;
        }
        return true;
    }
};
