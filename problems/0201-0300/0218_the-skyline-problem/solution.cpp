class Solution {
  public:
    vector<vector<int>> getSkyline(vector<vector<int>> &buildings) {
        // events: [x, kind, key, right]; key = -height for start, +height for end
        vector<array<int, 4>> events;
        events.reserve(buildings.size() * 2);
        for (const auto &b : buildings) {
            events.push_back({b[0], 0, -b[2], b[1]});
            events.push_back({b[1], 1, b[2], b[1]});
        }
        // Tuple sorting encodes the tie-breaking: starts (kind 0) before ends
        // (kind 1) at equal x so adjacent buildings hand off without a dip to
        // ground; taller starts first (-height); shorter ends first so a tall
        // building survives until its own right edge.
        sort(events.begin(), events.end());

        // max-heap of (height, right) with lazy removal; sentinel ground level
        // (right kept as long long so a building ending at INT_MAX can never
        // knock the sentinel out of the heap)
        priority_queue<pair<int, long long>> heap;
        heap.push({0, (long long)INT_MAX + 1});

        vector<vector<int>> result;
        int previousHeight = 0;
        for (const auto &ev : events) {
            int x = ev[0], kind = ev[1], key = ev[2], right = ev[3];
            // Lazy removal: pop top entries whose building has ended; stale
            // entries below the top are harmless until they surface.
            while (!heap.empty() && heap.top().second <= x) {
                heap.pop();
            }
            if (kind == 0) {
                heap.push({-key, right});
            }
            int currentHeight = heap.top().first;
            // Emit a key point only when the contour height actually changes,
            // which also merges consecutive equal-height segments.
            if (currentHeight != previousHeight) {
                result.push_back({x, currentHeight});
                previousHeight = currentHeight;
            }
        }
        return result;
    }
};
