class Solution {
  public:
    int visiblePoints(vector<vector<int>> &points, int angle, vector<int> &location) {
        int posx = location[0], posy = location[1];
        int same = 0;
        vector<double> degrees;
        for (auto &p : points) {
            int x = p[0], y = p[1];
            if (x == posx && y == posy) {
                ++same;
            } else {
                double deg = atan2((double)(y - posy), (double)(x - posx)) * 180.0 / M_PI;
                if (deg < 0)
                    deg += 360.0;
                degrees.push_back(deg);
            }
        }

        sort(degrees.begin(), degrees.end());
        int n = (int)degrees.size();
        vector<double> doubled = degrees;
        for (double d : degrees)
            doubled.push_back(d + 360.0);

        const double eps = 1e-9;
        int best = 0;
        int left = 0;
        for (int right = 0; right < (int)doubled.size(); ++right) {
            while (doubled[right] - doubled[left] > angle + eps)
                ++left;
            best = max(best, min(right - left + 1, n));
        }

        return same + best;
    }
};
