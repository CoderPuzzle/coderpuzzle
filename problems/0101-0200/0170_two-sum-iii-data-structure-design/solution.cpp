#include <unordered_map>

// Hash multiset: value -> occurrence count. add bumps a counter in O(1);
// find lazily scans the distinct values once, asking for each complement.
class TwoSum {
  public:
    TwoSum() = default;

    void add(int number) { ++counts[number]; }

    bool find(int value) {
        for (const auto &entry : counts) {
            int complement = value - entry.first;
            // A value that is its own complement needs two stored copies.
            if (counts.count(complement) && (complement != entry.first || entry.second > 1))
                return true;
        }
        return false;
    }

  private:
    std::unordered_map<int, int> counts;
};
