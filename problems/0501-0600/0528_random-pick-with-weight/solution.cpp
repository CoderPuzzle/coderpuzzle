#include <algorithm>
#include <random>
#include <vector>

// Prefix sums lay the weights end to end over [0, total); one uniform
// draw lands in exactly one segment, so index i comes back with
// probability exactly weights[i] / total.
class Solution {
  public:
    Solution(std::vector<int> weights) {
        prefix.push_back(0);
        for (int weight : weights) {
            prefix.push_back(prefix.back() + weight);
        }
    }

    int pickIndex() {
        std::uniform_int_distribution<long long> draw(1, prefix.back());
        long long target = draw(rng);
        // first index with prefix[i] >= target, minus one
        return (int)(std::lower_bound(prefix.begin(), prefix.end(), target) - prefix.begin()) - 1;
    }

  private:
    std::vector<long long> prefix;
    std::mt19937_64 rng{std::random_device{}()};
};
