#include <unordered_map>
#include <utility>
#include <vector>

class SnapshotArray {
  public:
    SnapshotArray(int length) {}

    void set(int index, int val) {
        std::vector<std::pair<int, int>> &entries = history[index];
        if (!entries.empty() && entries.back().first == current) {
            entries.back().second = val; // a second write in the same version
        } else {
            entries.emplace_back(current, val);
        }
    }

    int snap() { return current++; }

    int get(int index, int commit_id) {
        auto found = history.find(index);
        if (found == history.end()) {
            return 0; // never written
        }
        const std::vector<std::pair<int, int>> &entries = found->second;
        int low = 0;
        int high = (int)entries.size();
        while (low < high) { // rightmost entry at or before commit_id
            int mid = (low + high) / 2;
            if (entries[mid].first <= commit_id) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        return low == 0 ? 0 : entries[low - 1].second;
    }

  private:
    int current = 0; // version id the next snap() will return
    std::unordered_map<int, std::vector<std::pair<int, int>>> history;
};
