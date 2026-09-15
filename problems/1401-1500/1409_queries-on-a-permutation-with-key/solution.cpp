#include <algorithm>
#include <vector>

class Solution {
  public:
    std::vector<int> processQueries(std::vector<int> &queries, int m) {
        std::vector<int> p;
        p.reserve(m);
        for (int value = 1; value <= m; value++) {
            p.push_back(value);
        }
        std::vector<int> result;
        result.reserve(queries.size());
        for (int q : queries) {
            auto it = std::find(p.begin(), p.end(), q);
            int pos = (int)(it - p.begin());
            result.push_back(pos);
            p.erase(it);
            p.insert(p.begin(), q);
        }
        return result;
    }
};
