class Solution {
  public:
    vector<long long> minAvailableDuration(vector<vector<long long>> &slots1, vector<vector<long long>> &slots2,
                                           int duration) {
        auto a = sortedByStart(slots1);
        auto b = sortedByStart(slots2);
        size_t i = 0, j = 0;
        while (i < a.size() && j < b.size()) {
            long long start = max(a[i][0], b[j][0]);
            long long end = min(a[i][1], b[j][1]);
            if (end - start >= duration)
                return {start, start + duration};
            // The earlier-ending slot cannot overlap any later slot of the
            // other person, so only that pointer advances.
            if (a[i][1] < b[j][1])
                ++i;
            else
                ++j;
        }
        return {};
    }

  private:
    vector<array<long long, 2>> sortedByStart(vector<vector<long long>> &slots) {
        vector<array<long long, 2>> out;
        out.reserve(slots.size());
        for (const auto &slot : slots)
            out.push_back({slot[0], slot[1]});
        sort(out.begin(), out.end());
        return out;
    }
};
