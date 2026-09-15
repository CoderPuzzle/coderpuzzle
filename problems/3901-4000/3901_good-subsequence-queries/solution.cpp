#include <numeric>
#include <vector>

class Solution {
  public:
    int countGoodSubseq(std::vector<int> &nums, int p, std::vector<std::vector<int>> &queries) {
        const int limit = 50000;
        int n = nums.size();
        std::vector<int> smallest(limit + 1);
        std::iota(smallest.begin(), smallest.end(), 0);
        for (int value = 2; value * value <= limit; ++value) {
            if (smallest[value] == value) {
                for (int multiple = value * value; multiple <= limit; multiple += value) {
                    if (smallest[multiple] == multiple)
                        smallest[multiple] = value;
                }
            }
        }
        auto factors = [&](int value) {
            std::vector<int> result;
            while (value > 1) {
                int prime = smallest[value];
                result.push_back(prime);
                while (value % prime == 0)
                    value /= prime;
            }
            return result;
        };

        std::vector<int> counts(limit + 1), coveredXor(limit + 1), histogram(n + 1), forbidden(n);
        int allXor = 0, forbiddenDistinct = 0, active = 0;
        for (int i = 0; i < n; ++i)
            allXor ^= i;
        auto adjust = [&](int prime, int index, int delta) {
            int count = counts[prime];
            if (count == n - 1) {
                int missing = allXor ^ coveredXor[prime];
                if (--forbidden[missing] == 0)
                    --forbiddenDistinct;
            }
            if (count > 0)
                --histogram[count];
            counts[prime] += delta;
            coveredXor[prime] ^= index;
            count = counts[prime];
            if (count > 0)
                ++histogram[count];
            if (count == n - 1) {
                int missing = allXor ^ coveredXor[prime];
                if (forbidden[missing]++ == 0)
                    ++forbiddenDistinct;
            }
        };

        for (int i = 0; i < n; ++i) {
            if (nums[i] % p == 0) {
                ++active;
                for (int prime : factors(nums[i] / p))
                    adjust(prime, i, 1);
            }
        }
        int answer = 0;
        for (const auto &query : queries) {
            int index = query[0], value = query[1];
            if (nums[index] % p == 0) {
                for (int prime : factors(nums[index] / p))
                    adjust(prime, index, -1);
                --active;
            }
            nums[index] = value;
            if (value % p == 0) {
                ++active;
                for (int prime : factors(value / p))
                    adjust(prime, index, 1);
            }
            if (active > 0 && ((active < n && histogram[active] == 0) ||
                               (active == n && histogram[n] == 0 && forbiddenDistinct < n))) {
                ++answer;
            }
        }
        return answer;
    }
};
