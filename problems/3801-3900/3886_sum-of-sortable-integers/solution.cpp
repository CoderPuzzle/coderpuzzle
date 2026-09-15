#include <algorithm>
#include <vector>

using namespace std;

class Solution {
  public:
    int sortableIntegers(vector<int> &nums) {
        int n = (int)nums.size();
        vector<int> ordered = nums;
        sort(ordered.begin(), ordered.end());
        int total = 0;
        for (int k = 1; k <= n; ++k) {
            if (n % k != 0) {
                continue;
            }
            bool ok = true;
            for (int start = 0; start < n; start += k) {
                vector<int> block(nums.begin() + start, nums.begin() + start + k);
                vector<int> target(ordered.begin() + start, ordered.begin() + start + k);
                if (!isRotation(block, target)) {
                    ok = false;
                    break;
                }
            }
            if (ok) {
                total += k;
            }
        }
        return total;
    }

  private:
    // A sequence is a cyclic rotation of the block exactly when it appears
    // inside `block + block`; a KMP scan answers that in O(k).
    static bool isRotation(const vector<int> &block, const vector<int> &target) {
        int k = (int)block.size();
        vector<int> text(2 * k);
        for (int i = 0; i < k; ++i) {
            text[i] = block[i];
            text[i + k] = block[i];
        }
        vector<int> pi(k, 0);
        for (int i = 1; i < k; ++i) {
            int j = pi[i - 1];
            while (j > 0 && target[i] != target[j]) {
                j = pi[j - 1];
            }
            if (target[i] == target[j]) {
                ++j;
            }
            pi[i] = j;
        }
        int j = 0;
        for (int i = 0; i < 2 * k; ++i) {
            while (j > 0 && text[i] != target[j]) {
                j = pi[j - 1];
            }
            if (text[i] == target[j]) {
                ++j;
            }
            if (j == k) {
                return true;
            }
        }
        return false;
    }
};
