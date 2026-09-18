#include <random>
#include <unordered_map>
#include <vector>

class RandomizedSet {
  public:
    RandomizedSet() : generator(std::random_device{}()) {}

    bool insert(int val) {
        if (index.count(val)) {
            return false;
        }
        // Hash map from value -> index, plus a values array.
        index[val] = (int)values.size();
        values.push_back(val);
        return true;
    }

    bool remove(int val) {
        auto found = index.find(val);
        if (found == index.end()) {
            return false;
        }
        // Swap the victim with the last element and pop, so every
        // operation stays O(1).
        int slot = found->second;
        index.erase(found);
        int last = (int)values.size() - 1;
        if (slot != last) {
            int moved = values[last];
            values[slot] = moved;
            index[moved] = slot;
        }
        values.pop_back();
        return true;
    }

    int getRandom() {
        // Uniform over the live values.
        std::uniform_int_distribution<int> picker(0, (int)values.size() - 1);
        return values[picker(generator)];
    }

  private:
    std::vector<int> values;
    std::unordered_map<int, int> index;
    std::mt19937 generator;
};
