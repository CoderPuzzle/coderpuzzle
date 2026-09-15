#include <cstdint>
#include <unordered_map>
#include <vector>

using namespace std;

class Solution {
  public:
    int smallestUniqueSubarray(vector<int> &nums) {
        unordered_map<int, int> valueCounts;
        for (int value : nums)
            ++valueCounts[value];
        for (auto [value, count] : valueCounts) {
            if (count == 1)
                return 1;
        }
        if (valueCounts.size() == 1)
            return nums.size();

        const long long base = 100003;
        const long long mod1 = 10000019, mod2 = 10000079;
        int n = nums.size();
        vector<long long> power1(n + 1, 1), power2(n + 1, 1), prefix1(n + 1), prefix2(n + 1);
        for (int i = 0; i < n; ++i) {
            power1[i + 1] = power1[i] * base % mod1;
            power2[i + 1] = power2[i] * base % mod2;
            prefix1[i + 1] = (prefix1[i] * base + nums[i]) % mod1;
            prefix2[i + 1] = (prefix2[i] * base + nums[i]) % mod2;
        }
        auto works = [&](int length) {
            unordered_map<uint64_t, int> frequencies;
            frequencies.reserve(n - length + 1);
            for (int start = 0; start + length <= n; ++start) {
                int end = start + length;
                long long first = (prefix1[end] - prefix1[start] * power1[length] % mod1 + mod1) % mod1;
                long long second = (prefix2[end] - prefix2[start] * power2[length] % mod2 + mod2) % mod2;
                uint64_t key = (static_cast<uint64_t>(first) << 32) | second;
                ++frequencies[key];
            }
            for (auto [key, count] : frequencies) {
                if (count == 1)
                    return true;
            }
            return false;
        };
        int low = 1, high = n;
        while (low < high) {
            int middle = (low + high) / 2;
            if (works(middle))
                high = middle;
            else
                low = middle + 1;
        }
        return low;
    }
};
