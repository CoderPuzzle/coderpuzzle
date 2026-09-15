class Solution {
  public:
    int coinChange(vector<int> &coins, int amount) {
        // BFS over amounts: level k holds every amount reachable with
        // exactly k coins, so the first time `amount` is dequeued its level
        // is the minimum coin count. visited keeps each amount enqueued once.
        vector<char> visited(amount + 1, 0);
        visited[0] = 1;
        vector<int> queue;
        queue.push_back(0);
        int level = 0;
        for (size_t head = 0; head < queue.size();) {
            size_t size = queue.size();
            for (; head < size; head++) {
                int a = queue[head];
                if (a == amount) {
                    // Level order guarantees no cheaper level exists.
                    return level;
                }
                for (int c : coins) {
                    // Coins may be near INT_MAX, so test c <= amount - a
                    // before adding.
                    if (c <= amount - a && !visited[a + c]) {
                        visited[a + c] = 1;
                        queue.push_back(a + c);
                    }
                }
            }
            level++;
        }
        // The queue drained without ever reaching amount: unmakeable.
        return -1;
    }
};
