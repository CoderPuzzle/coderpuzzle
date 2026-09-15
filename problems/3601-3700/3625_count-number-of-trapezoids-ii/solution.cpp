class Solution {
  public:
    long long countTrapezoids(vector<vector<int>> &points) {
        // Hash every segment by its sign-fixed reduced slope, and within
        // a slope by its line intercept: two segments sharing a slope but
        // lying on different lines never share an endpoint and always
        // span a convex quadrilateral, while same-line pairs are
        // degenerate. Per slope the valid base-pairs are C(m,2) minus the
        // same-line C(c,2) sums. A parallelogram has two parallel-side
        // pairs and is therefore counted in two slope buckets; hashing
        // segments by diagonal midpoint (excluding equal-slope pairs,
        // i.e. collinear quadruples) counts each parallelogram exactly
        // once, so one subtraction makes every convex quad with parallel
        // sides count once. Bucket counts reach C(125000, 2) ~ 7.8e9, so
        // long long math is required.
        int n = points.size();
        auto gcd = [](int a, int b) {
            while (b != 0) {
                int t = a % b;
                a = b;
                b = t;
            }
            return a;
        };
        // slope packed as (dy + 2000) * 4096 + (dx + 2000), midpoint as
        // (x1 + x2 + 2000) * 4096 + (y1 + y2 + 2000) -- both fit 12 bits.
        unordered_map<long long, unordered_map<int, int>> slopeLines;
        unordered_map<long long, unordered_map<int, int>> midSlopes;
        for (int i = 0; i < n; ++i) {
            for (int j = i + 1; j < n; ++j) {
                int dx = points[j][0] - points[i][0];
                int dy = points[j][1] - points[i][1];
                int g = gcd(abs(dx), abs(dy));
                dx /= g;
                dy /= g;
                if (dx < 0 || (dx == 0 && dy < 0)) {
                    dx = -dx;
                    dy = -dy;
                }
                long long slope = (long long)(dy + 2000) * 4096 + (dx + 2000);
                slopeLines[slope][dx * points[i][1] - dy * points[i][0]]++;
                long long mid =
                    (long long)(points[i][0] + points[j][0] + 2000) * 4096 + (points[i][1] + points[j][1] + 2000);
                midSlopes[mid][slope]++;
            }
        }
        long long total = 0;
        for (auto &[slope, lines] : slopeLines) {
            long long m = 0;
            for (auto &[line, c] : lines)
                m += c;
            total += m * (m - 1) / 2;
            for (auto &[line, c] : lines)
                total -= (long long)c * (c - 1) / 2;
        }
        long long parallelograms = 0;
        for (auto &[mid, slopes] : midSlopes) {
            long long c = 0;
            for (auto &[slope, s] : slopes)
                c += s;
            parallelograms += c * (c - 1) / 2;
            for (auto &[slope, s] : slopes)
                parallelograms -= (long long)s * (s - 1) / 2;
        }
        return total - parallelograms;
    }
};
