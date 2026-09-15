class Solution {
  public:
    vector<int> closestRoom(vector<vector<int>> &rooms, vector<vector<int>> &queries) {
        int n = (int)rooms.size();
        int q = (int)queries.size();
        vector<int> roomsBySize(n);
        for (int i = 0; i < n; i++) {
            roomsBySize[i] = i;
        }
        sort(roomsBySize.begin(), roomsBySize.end(), [&](int a, int b) { return rooms[a][1] > rooms[b][1]; });
        // Offline trick: process queries by decreasing minSize so rooms only accumulate.
        vector<int> queryOrder(q);
        for (int j = 0; j < q; j++) {
            queryOrder[j] = j;
        }
        sort(queryOrder.begin(), queryOrder.end(), [&](int a, int b) { return queries[a][1] > queries[b][1]; });
        set<int> ids;
        vector<int> answers(q);
        int ri = 0;
        for (int j : queryOrder) {
            int preferred = queries[j][0];
            int minSize = queries[j][1];
            // Every room with size >= minSize qualifies; once inserted it stays
            // valid for all later queries (their thresholds are only smaller).
            while (ri < n && rooms[roomsBySize[ri]][1] >= minSize) {
                ids.insert(rooms[roomsBySize[ri]][0]);
                ri++;
            }
            // Closest candidates sit just below/above the lower_bound; best stays -1 when both
            // miss.
            auto it = ids.lower_bound(preferred);
            int best = -1;
            long long bestDist = LLONG_MAX;
            if (it != ids.begin()) {
                best = *prev(it);
                bestDist = (long long)preferred - best;
            }
            // Strict < keeps floor (the smaller id) when the distances tie.
            if (it != ids.end() && (long long)*it - preferred < bestDist) {
                best = *it;
            }
            answers[j] = best; // write via saved index: original order kept
        }
        return answers;
    }
};
