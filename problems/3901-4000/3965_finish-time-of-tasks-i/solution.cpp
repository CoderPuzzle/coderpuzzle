#include <algorithm>
#include <vector>

using namespace std;

class Solution {
  public:
    long long finishTime(int n, vector<vector<int>> &edges, vector<int> &baseTime) {
        vector<vector<int>> children(n);
        for (auto &edge : edges)
            children[edge[0]].push_back(edge[1]);
        vector<long long> finish(n, 0);
        for (int node = n - 1; node >= 0; --node) {
            if (children[node].empty()) {
                finish[node] = baseTime[node];
                continue;
            }
            long long earliest = 4e18;
            long long latest = -4e18;
            for (int child : children[node]) {
                earliest = min(earliest, finish[child]);
                latest = max(latest, finish[child]);
            }
            long long ownDuration = latest - earliest + baseTime[node];
            finish[node] = latest + ownDuration;
        }
        return finish[0];
    }
};
