#include <random>
#include <utility>
#include <vector>

class Solution {
  public:
    // The pristine original is kept untouched; every shuffle() runs
    // Fisher-Yates on a fresh copy — slot i (from the top down) swaps with a
    // uniformly chosen slot in [0, i] — so each of the n! orderings is
    // exactly equally likely, and reset() is a plain copy.
    explicit Solution(std::vector<int> nums) : original(std::move(nums)) {}

    std::vector<int> reset() { return original; }

    std::vector<int> shuffle() {
        std::vector<int> array = original;
        for (int i = (int)array.size() - 1; i > 0; i--) {
            std::uniform_int_distribution<int> pick(0, i);
            int j = pick(generator);
            std::swap(array[i], array[j]);
        }
        return array;
    }

  private:
    std::vector<int> original;
    std::mt19937_64 generator{std::random_device{}()};
};
