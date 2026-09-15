class Solution {
  public:
    vector<int> amountPainted(vector<vector<int>> &paint) {
        // Canvas of "next possibly-unpainted cell" pointers: painting a cell
        // points it one past itself and find() compresses the skips, so every
        // unit of the painting is walked exactly once across all n days.
        const int limit = 50001;
        vector<int> nxt(limit + 1);
        iota(nxt.begin(), nxt.end(), 0);
        auto find = [&](int cell) {
            int root = cell;
            while (nxt[root] != root)
                root = nxt[root];
            while (nxt[cell] != root) {
                // path compression
                int forward = nxt[cell];
                nxt[cell] = root;
                cell = forward;
            }
            return root;
        };
        vector<int> worklog;
        worklog.reserve(paint.size());
        for (const auto &day : paint) {
            int area = 0;
            int cell = find(day[0]);
            while (cell < day[1]) {
                area++;
                nxt[cell] = cell + 1;
                cell = find(cell + 1);
            }
            worklog.push_back(area);
        }
        return worklog;
    }
};
