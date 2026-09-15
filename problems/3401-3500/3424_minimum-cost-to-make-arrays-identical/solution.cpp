#include <algorithm>
#include <cstdlib>
#include <vector>

class Solution {
  public:
    long long minCost(vector<int> &arr, vector<int> &brr, long long k) {
        // Splitting into singleton blocks already realizes any
        // permutation, so one paid rearrangement is all Operation 1 can
        // offer; matching sorted to sorted then minimizes sum |a - b|
        // over permutations. The answer is the cheaper of leaving arr put
        // and paying k plus that matched cost. Sums reach 2 * 10^10 and
        // k itself is up to 2 * 10^10, so everything accumulates in
        // long long.
        long long direct = 0;
        for (int i = 0; i < (int)arr.size(); i++) {
            direct += abs(arr[i] - brr[i]);
        }
        vector<int> sa(arr), sb(brr);
        sort(sa.begin(), sa.end());
        sort(sb.begin(), sb.end());
        long long matched = k;
        for (int i = 0; i < (int)sa.size(); i++) {
            matched += abs(sa[i] - sb[i]);
        }
        return min(direct, matched);
    }
};
