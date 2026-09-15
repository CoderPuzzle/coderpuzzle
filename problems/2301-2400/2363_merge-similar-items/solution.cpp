#include <algorithm>
#include <map>
#include <vector>

class Solution {
  public:
    vector<vector<int>> mergeSimilarItems(vector<vector<int>> &items1, vector<vector<int>> &items2) {
        // A ordered map keyed by value accumulates weights from both lists
        // and iterates in ascending value order for free.
        std::map<int, int> weights;
        for (const vector<vector<int>> *items : {&items1, &items2}) {
            for (const vector<int> &item : *items) {
                weights[item[0]] += item[1];
            }
        }
        vector<vector<int>> ret;
        ret.reserve(weights.size());
        for (const auto &[value, weight] : weights) {
            ret.push_back({value, weight});
        }
        return ret;
    }
};
