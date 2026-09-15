#include <algorithm>
#include <string>
#include <vector>

class CombinationIterator {
    // Precompute all combinations via bitmask enumeration. With n <= 15
    // there are at most 2^15 masks; a mask is kept when its popcount
    // equals the combination length. Ascending mask order groups the
    // strings by their highest chosen index rather than by first letter,
    // so an explicit sort restores the lexicographic sequence.
    std::vector<std::string> combinations;
    size_t position = 0;

  public:
    CombinationIterator(std::string characters, int combinationLength) {
        int n = static_cast<int>(characters.size());
        for (int mask = 0; mask < (1 << n); mask++) {
            if (__builtin_popcount(mask) != combinationLength) {
                continue;
            }
            std::string combo;
            for (int i = 0; i < n; i++) {
                if (mask >> i & 1) {
                    combo.push_back(characters[i]);
                }
            }
            combinations.push_back(combo);
        }
        std::sort(combinations.begin(), combinations.end());
    }

    std::string next() { return combinations[position++]; }

    bool hasNext() { return position < combinations.size(); }
};
