#include <set>
#include <unordered_map>
#include <vector>

// Hash map from value -> ordered set of indices, plus a values array.
// Deterministic variant: remove deletes the leftmost occurrence and moves
// the last element into the vacated slot; draw returns values[0].
class RandomizedCollection {
  public:
    RandomizedCollection() = default;

    bool insert(int val) {
        auto found = indices.find(val);
        bool present = found != indices.end();
        values.push_back(val);
        int index = (int)values.size() - 1; // new index is always the maximum
        if (present) {
            found->second.insert(index);
        } else {
            indices.emplace(val, std::set<int>{index});
        }
        return !present;
    }

    bool remove(int val) {
        auto found = indices.find(val);
        if (found == indices.end() || found->second.empty()) {
            return false;
        }
        std::set<int> &positions = found->second;
        int index = *positions.begin(); // leftmost occurrence
        int last = (int)values.size() - 1;
        if (values[last] == val) {
            // The moved element equals the removed one: a copy stays at
            // `index`, so only the last index leaves the set.
            positions.erase(last);
        } else {
            int moved = values[last];
            values[index] = moved;
            std::set<int> &others = indices.find(moved)->second;
            others.erase(last);
            others.insert(index);
            positions.erase(index);
        }
        values.pop_back();
        if (positions.empty()) {
            indices.erase(found);
        }
        return true;
    }

    int getRandom() { return values[0]; }

  private:
    std::vector<int> values;
    std::unordered_map<int, std::set<int>> indices;
};
