#include <algorithm>
#include <cstdint>
#include <random>
#include <utility>
#include <vector>

class Solution {
  public:
    // Prefix sums over rectangle areas (integer cells, (xi-ai+1)*(yi-bi+1))
    // select a rectangle with probability proportional to its area; a
    // uniform cell offset inside it yields the point — so every covered
    // integer point is exactly equally likely.
    explicit Solution(std::vector<std::vector<int>> rects) : rects(std::move(rects)) {
        prefix.push_back(0);
        for (const auto &rect : this->rects) {
            long long width = (long long)rect[2] - rect[0] + 1;
            long long height = (long long)rect[3] - rect[1] + 1;
            prefix.push_back(prefix.back() + width * height);
        }
    }

    std::vector<int> pick() {
        std::uniform_int_distribution<long long> pick(0, prefix.back() - 1);
        long long cell = pick(generator);
        // First rectangle whose cumulative area exceeds the drawn cell.
        size_t index = (size_t)(std::upper_bound(prefix.begin() + 1, prefix.end(), cell) - prefix.begin()) - 1;
        const std::vector<int> &rect = rects[index];
        long long width = (long long)rect[2] - rect[0] + 1;
        long long offset = cell - prefix[index];
        return {rect[0] + (int)(offset % width), rect[1] + (int)(offset / width)};
    }

  private:
    std::vector<std::vector<int>> rects;
    std::vector<long long> prefix;
    std::mt19937_64 generator{std::random_device{}()};
};
