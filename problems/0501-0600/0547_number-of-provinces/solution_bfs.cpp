class Solution {
  public:
    int findCircleNum(vector<vector<int>> &isConnected) {
        int n = isConnected.size();
        vector<char> visited(n, 0);
        int provinces = 0;
        for (int start = 0; start < n; start++) {
            if (visited[start]) {
                continue;
            }
            // An unvisited city during the sweep starts a new component;
            // this one traversal absorbs exactly one province.
            provinces++;
            visited[start] = 1;
            vector<int> queue;
            queue.push_back(start);
            // The FIFO queue spreads through the province in waves, expanding
            // every city at hop distance d before any at d + 1, yet only
            // visitation, not the order, decides the count.
            for (size_t head = 0; head < queue.size(); head++) {
                int city = queue[head];
                for (int other = 0; other < n; other++) {
                    if (isConnected[city][other] == 1 && !visited[other]) {
                        // Mark at enqueue time so no city enters the queue twice;
                        // each city is dequeued once and its adjacency row scanned
                        // once.
                        visited[other] = 1;
                        queue.push_back(other);
                    }
                }
            }
        }
        return provinces;
    }
};
