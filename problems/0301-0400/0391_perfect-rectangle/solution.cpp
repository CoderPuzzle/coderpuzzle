class Solution {
  public:
    bool isRectangleCover(vector<vector<int>> &rectangles) {
        // Two signatures of an exact cover, gathered in one pass: the piece
        // areas must sum to the bounding rectangle's area, and every interior
        // corner cancels, leaving exactly the bounding box's four corners.
        long long area = 0;
        int minX = INT_MAX, minY = INT_MAX, maxA = INT_MIN, maxB = INT_MIN;
        unordered_set<long long> corners;
        for (const auto &rectangle : rectangles) {
            int x = rectangle[0], y = rectangle[1], a = rectangle[2], b = rectangle[3];
            area += (long long)(a - x) * (b - y);
            minX = min(minX, x);
            minY = min(minY, y);
            maxA = max(maxA, a);
            maxB = max(maxB, b);
            // Toggle: add when absent, remove when present, so a corner
            // shared by 2 or 4 pieces vanishes instead of accumulating.
            for (long long corner : {pack(x, y), pack(x, b), pack(a, y), pack(a, b)}) {
                if (!corners.erase(corner)) {
                    corners.insert(corner);
                }
            }
        }
        return corners.size() == 4 && corners.count(pack(minX, minY)) && corners.count(pack(minX, maxB)) &&
               corners.count(pack(maxA, minY)) && corners.count(pack(maxA, maxB)) &&
               area == (long long)(maxA - minX) * (maxB - minY);
    }

  private:
    // Coordinates fit in 32 bits each, so the pair packs into one long long key.
    static long long pack(int x, int y) { return ((long long)x << 32) | (unsigned int)y; }
};
