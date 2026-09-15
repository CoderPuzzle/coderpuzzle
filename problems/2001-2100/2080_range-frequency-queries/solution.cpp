#include <algorithm>
#include <unordered_map>
#include <vector>

class RangeFreqQuery {
  public:
    RangeFreqQuery(vector<int> &arr) {
        for (int index = 0; index < static_cast<int>(arr.size()); ++index) {
            positions[arr[index]].push_back(index);
        }
    }

    int query(int left, int right, int value) {
        const vector<int> &indices = positions[value];
        auto first = lower_bound(indices.begin(), indices.end(), left);
        auto after = upper_bound(indices.begin(), indices.end(), right);
        return static_cast<int>(after - first);
    }

  private:
    unordered_map<int, vector<int>> positions;
};
