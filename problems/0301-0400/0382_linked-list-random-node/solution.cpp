#include <random>
#include <vector>

// The list is materialized once as an array of node values (the wire
// form already lists them in order); draw draws one slot uniformly,
// which is exactly a uniform choice over the list's nodes.
class Solution {
  public:
    Solution(std::vector<int> head) : values(std::move(head)) {}

    int getRandom() {
        std::uniform_int_distribution<int> slot(0, (int)values.size() - 1);
        return values[slot(rng)];
    }

  private:
    std::vector<int> values;
    std::mt19937_64 rng{std::random_device{}()};
};
