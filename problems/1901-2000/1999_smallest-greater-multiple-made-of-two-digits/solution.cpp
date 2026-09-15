#include <algorithm>
#include <vector>

class Solution {
  public:
    int findInteger(int k, int digit1, int digit2) {
        // The only numbers that can qualify are those whose decimal
        // representation uses just {digit1, digit2}; there are at most
        // 2 + 4 + ... + 2^10 = 2046 of them up to 10 digits (11-digit
        // values already exceed 2^31 - 1). Generate every one, sort the
        // list, and scan for the first value that is > k and divisible
        // by k. A number never starts with 0, so seed the generation
        // with the nonzero digits only. Values reach 10^10, so build
        // them in 64-bit arithmetic.
        vector<long long> digits;
        digits.push_back(digit1);
        if (digit2 != digit1) {
            digits.push_back(digit2);
        }
        sort(digits.begin(), digits.end());
        vector<long long> cur;
        for (long long d : digits) {
            if (d != 0) {
                cur.push_back(d);
            }
        }
        vector<long long> cands;
        for (int len = 0; len < 10; ++len) {
            cands.insert(cands.end(), cur.begin(), cur.end());
            vector<long long> nxt;
            for (long long v : cur) {
                for (long long d : digits) {
                    nxt.push_back(v * 10 + d);
                }
            }
            cur.swap(nxt);
        }
        sort(cands.begin(), cands.end());
        for (long long v : cands) {
            if (v > 2147483647LL) {
                break;
            }
            if (v > k && v % k == 0) {
                return (int)v;
            }
        }
        return -1;
    }
};
