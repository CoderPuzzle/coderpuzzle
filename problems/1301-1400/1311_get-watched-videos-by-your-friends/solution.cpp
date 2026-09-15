class Solution {
  public:
    vector<string> watchedVideosByFriends(vector<vector<string>> &watchedVideos, vector<vector<int>> &friends, int id,
                                          int level) {
        // BFS discovers nodes in increasing distance order, so the nodes whose
        // recorded distance equals `level` are exactly the level-k people.
        int n = (int)friends.size();
        vector<int> dist(n, -1);
        dist[id] = 0;
        queue<int> pending;
        pending.push(id);
        unordered_map<string, int> counts;
        while (!pending.empty()) {
            int cur = pending.front();
            pending.pop();
            if (dist[cur] == level) {
                for (const string &video : watchedVideos[cur]) {
                    ++counts[video];
                }
                continue;
            }
            for (int nxt : friends[cur]) {
                if (dist[nxt] == -1) {
                    dist[nxt] = dist[cur] + 1;
                    pending.push(nxt);
                }
            }
        }
        vector<pair<int, string>> flipped;
        flipped.reserve(counts.size());
        for (const auto &[name, count] : counts) {
            flipped.emplace_back(count, name);
        }
        sort(flipped.begin(), flipped.end());
        vector<string> result;
        result.reserve(flipped.size());
        for (const auto &[count, name] : flipped) {
            result.push_back(name);
        }
        return result;
    }
};
