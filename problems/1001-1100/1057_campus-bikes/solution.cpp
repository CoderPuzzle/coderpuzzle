class Solution {
  public:
    vector<int> assignBikes(vector<vector<int>> &workers, vector<vector<int>> &bikes) {
        // Build one (distance, worker index, bike index) triple per pair and
        // sort ascending by distance, then worker index, then bike index —
        // exactly the tie-break the statement specifies. Walking the sorted
        // triples and assigning the first time both sides are still free
        // reproduces the statement's own greedy process.
        int n = workers.size();
        int m = bikes.size();
        vector<array<int, 3>> triples;
        triples.reserve(static_cast<size_t>(n) * m);
        for (int i = 0; i < n; ++i) {
            for (int j = 0; j < m; ++j) {
                int distance = abs(workers[i][0] - bikes[j][0]) + abs(workers[i][1] - bikes[j][1]);
                triples.push_back({distance, i, j});
            }
        }
        sort(triples.begin(), triples.end());

        vector<int> result(n, -1);
        vector<bool> usedBike(m, false);
        int assigned = 0;
        for (auto &triple : triples) {
            int i = triple[1];
            int j = triple[2];
            if (result[i] != -1 || usedBike[j])
                continue;
            result[i] = j;
            usedBike[j] = true;
            ++assigned;
            if (assigned == n)
                break;
        }
        return result;
    }
};
