class Solution {
  public:
    int minimumFlips(int n) {
        // The binary form without leading zeros: peel low bits off, then
        // put the most-significant bit first.
        string s;
        while (n > 0) {
            s += char('0' + (n & 1));
            n >>= 1;
        }
        for (int i = 0, j = (int)s.size() - 1; i < j; i++, j--) {
            char tmp = s[i];
            s[i] = s[j];
            s[j] = tmp;
        }
        // Walk inward from both ends. When the two bits of a pair differ,
        // each end sits on a position whose required bit is the opposite
        // end's bit, so the pair pays exactly two flips.
        int flips = 0;
        int left = 0, right = (int)s.size() - 1;
        while (left < right) {
            if (s[left] != s[right]) {
                flips += 2;
            }
            left++;
            right--;
        }
        return flips;
    }
};
