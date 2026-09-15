class Solution {
  public:
    int numBusesToDestination(vector<vector<int>> &routes, int source, int target) {
        // Early exits: same stop needs no bus; an endpoint on no route
        // has no path.
        if (source == target) {
            return 0;
        }
        // Map each stop to the routes passing through it.
        unordered_map<int, vector<int>> stopToRoutes;
        for (int r = 0; r < (int)routes.size(); r++) {
            for (int s : routes[r]) {
                stopToRoutes[s].push_back(r);
            }
        }
        if (stopToRoutes.find(source) == stopToRoutes.end() || stopToRoutes.find(target) == stopToRoutes.end()) {
            return -1;
        }
        unordered_set<int> usedRoutes;
        unordered_set<int> seenStops;
        seenStops.insert(source);
        deque<pair<int, int>> queue;
        queue.push_back({source, 0});
        while (!queue.empty()) {
            auto [stop, buses] = queue.front();
            queue.pop_front();
            auto it = stopToRoutes.find(stop);
            if (it == stopToRoutes.end()) {
                continue;
            }
            for (int r : it->second) {
                // BFS over stops: boarding a route reaches all its
                // stops one level deeper. Expand each route only once
                // ever — re-boarding can only revisit stops already
                // found at an equal or smaller ride count.
                if (usedRoutes.count(r)) {
                    continue;
                }
                usedRoutes.insert(r);
                for (int nxt : routes[r]) {
                    // The target is counted on sight — no need to
                    // enqueue it.
                    if (nxt == target) {
                        return buses + 1;
                    }
                    if (!seenStops.count(nxt)) {
                        seenStops.insert(nxt);
                        queue.push_back({nxt, buses + 1});
                    }
                }
            }
        }
        return -1;
    }
};
