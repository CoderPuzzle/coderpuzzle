#include <vector>

class Allocator {
  public:
    // Flat cell array holding each unit's mID (0 = free). allocate
    // linear-scans runs of free cells for the leftmost fit; freeMemory
    // sweeps the same array once, zeroing every match.
    Allocator(int n) : units_(n, 0) {}

    int allocate(int size, int mID) {
        int i = 0;
        while (i < (int)units_.size()) {
            if (units_[i] == 0) {
                int j = i;
                while (j < (int)units_.size() && units_[j] == 0)
                    ++j;
                if (j - i >= size) {
                    for (int k = i; k < i + size; ++k)
                        units_[k] = mID;
                    return i;
                }
                i = j;
            } else {
                ++i;
            }
        }
        return -1;
    }

    int freeMemory(int mID) {
        int freed = 0;
        for (int k = 0; k < (int)units_.size(); ++k) {
            if (units_[k] == mID) {
                units_[k] = 0;
                ++freed;
            }
        }
        return freed;
    }

  private:
    std::vector<int> units_;
};
