class Solution {
  public:
    int smallestChair(vector<vector<int>> &times, int targetFriend) {
        int n = times.size();
        vector<int> order(n);
        for (int i = 0; i < n; i++)
            order[i] = i;
        sort(order.begin(), order.end(), [&](int a, int b) { return times[a][0] < times[b][0]; });
        // min-heap of (leaving_time, chair)
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> occupied;
        priority_queue<int, vector<int>, greater<int>> free; // min-heap of free chair numbers
        int nextChair = 0;
        for (int idx = 0; idx < n; idx++) {
            int i = order[idx];
            int arrival = times[i][0];
            int leaving = times[i][1];
            while (!occupied.empty() && occupied.top().first <= arrival) {
                free.push(occupied.top().second);
                occupied.pop();
            }
            int chair;
            if (!free.empty()) {
                chair = free.top();
                free.pop();
            } else {
                chair = nextChair;
                nextChair++;
            }
            if (i == targetFriend)
                return chair;
            occupied.push({leaving, chair});
        }
        return -1;
    }
};
