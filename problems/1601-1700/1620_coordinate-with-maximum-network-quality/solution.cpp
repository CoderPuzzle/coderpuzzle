class Solution {
  public:
    vector<int> bestCoordinate(vector<vector<int>> &towers, int radius) {
        int bestX = 0, bestY = 0;
        long long bestQuality = -1;

        for (int x = 0; x <= 50; x++) {
            for (int y = 0; y <= 50; y++) {
                long long total = 0;
                for (auto &tower : towers) {
                    double dx = tower[0] - x;
                    double dy = tower[1] - y;
                    double d = sqrt(dx * dx + dy * dy);
                    if (d <= radius) {
                        total += (long long)floor(tower[2] / (1 + d));
                    }
                }
                if (total > bestQuality) {
                    bestQuality = total;
                    bestX = x;
                    bestY = y;
                }
            }
        }

        return {bestX, bestY};
    }
};
