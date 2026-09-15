#include <unordered_map>
#include <vector>

class Solution {
  public:
    int findValidSplit(std::vector<int> &nums) {
        // Coprimality of the two products is decided by shared prime
        // factors, never by the products themselves: with n up to 10^4
        // and values up to 10^6, both sides reach thousands of digits.
        // Boundary i works exactly when no prime's occurrence span
        // [first, last] straddles it. A smallest-prime-factor sieve
        // factorizes each element in O(log value); a difference array
        // blocks the straddled boundaries; the first open boundary in
        // [0, n - 2] wins.
        int top = 0;
        for (int value : nums)
            top = std::max(top, value);
        std::vector<int> spf(top + 1);
        for (int i = 0; i <= top; ++i)
            spf[i] = i;
        for (long long d = 2; d * d <= top; ++d) {
            if (spf[d] == d) {
                for (long long multiple = d * d; multiple <= top; multiple += d) {
                    if (spf[multiple] == multiple)
                        spf[multiple] = d;
                }
            }
        }
        std::unordered_map<int, int> first;
        std::unordered_map<int, int> last;
        for (int index = 0; index < (int)nums.size(); ++index) {
            int value = nums[index];
            while (value > 1) {
                int prime = spf[value];
                first.emplace(prime, index);
                last[prime] = index;
                while (value % prime == 0)
                    value /= prime;
            }
        }
        int n = (int)nums.size();
        std::vector<int> blocked(n + 1, 0);
        for (const std::pair<const int, int> &entry : first) {
            int lo = entry.second;
            int hi = std::min(last[entry.first] - 1, n - 2);
            if (lo <= hi) {
                ++blocked[lo];
                --blocked[hi + 1];
            }
        }
        int running = 0;
        for (int i = 0; i < n - 1; ++i) {
            running += blocked[i];
            if (running == 0)
                return i;
        }
        return -1;
    }
};
