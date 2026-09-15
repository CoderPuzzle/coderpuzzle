class Solution {
  public:
    bool isPrintable(vector<vector<int>> &targetGrid) {
        int rows = targetGrid.size(), cols = targetGrid[0].size();

        // Each color's bounding rectangle: the smallest axis-aligned box
        // that covers every cell holding that color in the target grid.
        // Stored as {minRow, maxRow, minCol, maxCol}.
        unordered_map<int, array<int, 4>> bbox;
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                int color = targetGrid[r][c];
                auto it = bbox.find(color);
                if (it == bbox.end()) {
                    bbox[color] = {r, r, c, c};
                } else {
                    it->second[0] = min(it->second[0], r);
                    it->second[1] = max(it->second[1], r);
                    it->second[2] = min(it->second[2], c);
                    it->second[3] = max(it->second[3], c);
                }
            }
        }

        // An edge color -> other means color's bounding box shows `other`
        // somewhere inside it, so color must be stamped before `other`.
        unordered_map<int, unordered_set<int>> adjacency;
        for (auto &[color, box] : bbox) {
            auto &neighbors = adjacency[color];
            for (int r = box[0]; r <= box[1]; r++) {
                for (int c = box[2]; c <= box[3]; c++) {
                    int other = targetGrid[r][c];
                    if (other != color)
                        neighbors.insert(other);
                }
            }
        }

        // A valid stamp order exists iff this dependency graph has no cycle.
        unordered_map<int, int> state; // 0 = white, 1 = gray, 2 = black
        for (auto &[color, box] : bbox)
            state[color] = 0;

        function<bool(int)> hasCycle = [&](int node) -> bool {
            state[node] = 1;
            for (int neighbor : adjacency[node]) {
                if (state[neighbor] == 1)
                    return true;
                if (state[neighbor] == 0 && hasCycle(neighbor))
                    return true;
            }
            state[node] = 2;
            return false;
        };

        for (auto &[color, box] : bbox) {
            if (state[color] == 0 && hasCycle(color))
                return false;
        }
        return true;
    }
};
