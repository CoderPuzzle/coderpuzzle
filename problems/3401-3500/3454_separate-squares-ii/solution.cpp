class Solution {
  public:
    double separateSquares(vector<vector<int>> &squares) {
        int n = squares.size();
        // compressed x-coordinates (square left and right edges)
        vector<long long> xs;
        xs.reserve(2 * n);
        for (const auto &sq : squares) {
            xs.push_back(sq[0]);
            xs.push_back((long long)sq[0] + sq[2]);
        }
        sort(xs.begin(), xs.end());
        xs.erase(unique(xs.begin(), xs.end()), xs.end());
        int m = xs.size();
        unordered_map<long long, int> index;
        for (int i = 0; i < m; i++)
            index[xs[i]] = i;

        // y-sweep events: square bottom (+1) and top (-1)
        vector<array<long long, 4>> events;
        events.reserve(2 * n);
        for (const auto &sq : squares) {
            long long x = sq[0], y = sq[1], l = sq[2];
            events.push_back({y, x, x + l, 1});
            events.push_back({y + l, x, x + l, -1});
        }
        sort(events.begin(), events.end());

        vector<int> count(4 * m, 0);
        vector<long long> cover(4 * m, 0);
        auto update = [&](auto &&self, int node, int lo, int hi, int i, int j, int delta) -> void {
            if (j <= lo || hi <= i)
                return;
            if (i <= lo && hi <= j) {
                count[node] += delta;
            } else {
                int mid = (lo + hi) / 2;
                self(self, 2 * node, lo, mid, i, j, delta);
                self(self, 2 * node + 1, mid, hi, i, j, delta);
            }
            if (count[node] > 0) {
                cover[node] = xs[hi] - xs[lo];
            } else if (hi - lo == 1) {
                cover[node] = 0;
            } else {
                cover[node] = cover[2 * node] + cover[2 * node + 1];
            }
        };

        // Pass 1: record every positive-width band and accumulate the total
        // covered (union) area — exact integer arithmetic throughout.
        vector<array<long long, 4>> bands; // {y0, y1, width, areaBefore}
        long long total = 0;
        int k = 0;
        while (k < (int)events.size()) {
            long long y = events[k][0];
            while (k < (int)events.size() && events[k][0] == y) {
                update(update, 1, 0, m - 1, index[events[k][1]], index[events[k][2]], (int)events[k][3]);
                k++;
            }
            if (k < (int)events.size()) {
                long long width = cover[1];
                if (width > 0) {
                    long long y1 = events[k][0];
                    bands.push_back({y, y1, width, total});
                    total += width * (y1 - y);
                }
            }
        }

        // Pass 2: the first band whose end reaches half of the total contains
        // the balance line; only here do we divide.
        long long area = 0;
        for (const auto &b : bands) {
            long long after = area + b[2] * (b[1] - b[0]);
            if (2 * after >= total) {
                return (double)b[0] + (double)(total - 2 * area) / (2.0 * (double)b[2]);
            }
            area = after;
        }
        return 0.0; // unreachable: at least one square covers positive area
    }
};
