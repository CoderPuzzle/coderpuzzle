class Solution {
  public:
    int minGroups(vector<vector<int>> &intervals) {
        int n = intervals.size();
        vector<int> starts(n);
        vector<int> ends(n);
        for (int i = 0; i < n; i++) {
            starts[i] = intervals[i][0];
            ends[i] = intervals[i][1];
        }
        sort(starts.begin(), starts.end());
        sort(ends.begin(), ends.end());
        // Answer = peak coverage depth: intervals sharing a point pairwise
        // intersect, so they need distinct groups, and peak depth suffices.
        // Only openings can create depth, so stop once starts are used up.
        int groups = 0;
        int active = 0;
        int i = 0;
        int j = 0;
        while (i < n) {
            // '<=' keeps touching intervals ([1,5],[5,8]) overlapping —
            // the opening at ends[j] is processed before that close.
            if (starts[i] <= ends[j]) {
                active += 1;
                if (active > groups) {
                    groups = active;
                }
                i += 1;
            } else {
                active -= 1;
                j += 1;
            }
        }
        return groups;
    }
};
