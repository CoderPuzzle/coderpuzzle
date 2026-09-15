class Solution {
  public:
    long long numberOfWays(string s) {
        long long zeros = 0, ones = 0, seq01 = 0, seq10 = 0, total = 0;
        for (char c : s) {
            if (c == '0') {
                total += seq10;
                seq01 += ones;
                zeros++;
            } else {
                total += seq01;
                seq10 += zeros;
                ones++;
            }
        }
        return total;
    }
};
