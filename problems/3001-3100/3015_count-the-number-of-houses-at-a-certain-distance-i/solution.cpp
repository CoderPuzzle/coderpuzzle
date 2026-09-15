class Solution {
  public:
    vector<int> countOfPairs(int n, int x, int y) {
        vector<vector<int>> adjacency(n + 1);
        for (int house = 1; house < n; ++house) {
            adjacency[house].push_back(house + 1);
            adjacency[house + 1].push_back(house);
        }
        if (x != y) {
            adjacency[x].push_back(y);
            adjacency[y].push_back(x);
        }

        vector<int> result(n, 0);
        vector<int> distance(n + 1);
        vector<int> queue(n + 1);
        for (int source = 1; source <= n; ++source) {
            // Breadth-first distances from source over the chain plus the
            // extra street; every other house lands at distance >= 1.
            for (int house = 1; house <= n; ++house) {
                distance[house] = -1;
            }
            int head = 0, tail = 0;
            distance[source] = 0;
            queue[tail++] = source;
            while (head < tail) {
                int house = queue[head++];
                for (int neighbor : adjacency[house]) {
                    if (distance[neighbor] < 0) {
                        distance[neighbor] = distance[house] + 1;
                        queue[tail++] = neighbor;
                    }
                }
            }
            for (int target = 1; target <= n; ++target) {
                // Skip the source itself: its distance-zero pair belongs
                // to no bucket.
                if (distance[target] > 0) {
                    ++result[distance[target] - 1];
                }
            }
        }
        return result;
    }
};
