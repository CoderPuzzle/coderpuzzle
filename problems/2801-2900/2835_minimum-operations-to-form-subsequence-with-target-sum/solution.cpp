#include <vector>

class Solution {
  public:
    int minOperations(std::vector<int> &nums, int target) {
        // Bucket elements by their power-of-two exponent. Element sums reach
        // 1000 * 2^30, which overflows int: keep the running total in long
        // long.
        long long count[62] = {0};
        long long total = 0;
        for (int num : nums) {
            int exponent = 0;
            for (int value = num; value > 1; value >>= 1) {
                ++exponent;
            }
            count[exponent]++;
            total += num;
        }
        // Every operation preserves the array sum, so a subsequence can never
        // exceed it.
        if (total < target) {
            return -1;
        }
        long long operations = 0;
        for (int bit = 0; bit <= 30; ++bit) {
            if ((target >> bit) & 1) {
                if (count[bit] > 0) {
                    count[bit]--;
                } else {
                    int source = bit + 1;
                    while (count[source] == 0) {
                        ++source;
                    }
                    // Unreachable given the total check; a defensive stop.
                    if (source > 60) {
                        return -1;
                    }
                    operations += source - bit;
                    count[source]--;
                    // The split chain banks one spare twin at every passed
                    // level and its own twin right at the needed level.
                    for (int spare = bit + 1; spare < source; ++spare) {
                        count[spare]++;
                    }
                    count[bit]++;
                }
            }
            // Leftover pairs at this level stand in for the element one level
            // up, so they feed the next iteration for free.
            count[bit + 1] += count[bit] / 2;
        }
        return static_cast<int>(operations);
    }
};
