#include <random>
#include <unordered_map>
#include <unordered_set>
#include <vector>

class Solution {
  public:
    // The n - b allowed values are compressed into [0, n - b); each
    // excluded value inside that range is remapped onto a free value from
    // the upper part [n - b, n). pick() then makes exactly one random call
    // over the compressed range and follows the remap — uniform over
    // exactly the allowed values.
    Solution(int n, std::vector<int> excluded) : generator(std::random_device{}()) {
        std::unordered_set<int> blocked(excluded.begin(), excluded.end());
        size = (long long)n - (long long)blocked.size();
        long long free = size; // scans [size, n) for values that are not excluded
        for (int value : blocked) {
            if (value < size) {
                while (blocked.count((int)free) > 0) {
                    free++;
                }
                mapping.emplace(value, (int)free);
                free++;
            }
        }
    }

    int pick() {
        long long draw = std::uniform_int_distribution<long long>(0, size - 1)(generator);
        auto found = mapping.find((int)draw);
        return found == mapping.end() ? (int)draw : found->second;
    }

  private:
    long long size;
    std::unordered_map<int, int> mapping;
    std::mt19937_64 generator;
};
