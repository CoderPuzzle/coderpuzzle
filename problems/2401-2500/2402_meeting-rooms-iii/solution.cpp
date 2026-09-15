class Solution {
  public:
    int mostBooked(int n, vector<vector<int>> &meetings) {
        int m = (int)meetings.size();
        vector<array<int, 3>> ordered;
        ordered.reserve(m);
        for (int i = 0; i < m; i++) {
            ordered.push_back({meetings[i][0], meetings[i][1], i});
        }
        stable_sort(ordered.begin(), ordered.end(),
                    [](const array<int, 3> &a, const array<int, 3> &b) { return a[0] < b[0]; });
        // endTime[i] = when room i frees up (-1: never used, always free).
        vector<long long> endTime(n, -1);
        vector<int> count(n, 0);
        for (const auto &mt : ordered) {
            int s = mt[0], e = mt[1];
            // Lowest-numbered room already free by s wins the allocation.
            int room = -1;
            for (int i = 0; i < n; i++) {
                if (endTime[i] <= s) {
                    room = i;
                    break;
                }
            }
            if (room == -1) {
                // All busy: take the earliest-finishing room (strict <
                // keeps the lowest index on ties) and delay the meeting
                // there with its original duration.
                room = 0;
                for (int i = 1; i < n; i++) {
                    if (endTime[i] < endTime[room]) {
                        room = i;
                    }
                }
                endTime[room] += (long long)(e - s);
            } else {
                endTime[room] = e;
            }
            count[room]++;
        }
        // Strict comparison keeps the lowest room index on count ties.
        int best = 0;
        for (int i = 1; i < n; i++) {
            if (count[i] > count[best])
                best = i;
        }
        return best;
    }
};
