#include <vector>

using namespace std;

class Solution {
  public:
    int smallestBalancedIndex(vector<int> &nums) {
        // Suffix products saturate at total + 1: any product above the
        // total sum can never equal a prefix sum, so the sentinel value
        // compares correctly while staying inside a long long.
        int n = (int)nums.size();
        long long total = 0;
        for (int v : nums) {
            total += v;
        }
        long long cap = total + 1;
        vector<long long> suffix(n + 1, 1);
        long long prod = 1;
        for (int i = n - 1; i >= 0; i--) {
            if (prod > cap / nums[i]) {
                prod = cap;
            } else {
                prod *= nums[i];
            }
            suffix[i] = prod;
        }
        long long left = 0;
        for (int i = 0; i < n; i++) {
            if (left == suffix[i + 1]) {
                return i;
            }
            left += nums[i];
        }
        return -1;
    }
};
