class Solution {
  public:
    int earliestFullBloom(vector<int> &plantTime, vector<int> &growTime) {
        int n = plantTime.size();
        vector<int> idx(n);
        iota(idx.begin(), idx.end(), 0);
        // Total planting time is fixed regardless of order, so only the
        // order matters: by an exchange argument, plant slow-growing seeds
        // first so their long growth overlaps the planting of the rest.
        stable_sort(idx.begin(), idx.end(), [&](int a, int b) { return growTime[a] > growTime[b]; });
        int best = 0;
        int prefix = 0;
        for (int i : idx) {
            // prefix is when seed i finishes planting; it blooms at
            // prefix + growTime[i]. The answer is the max over all seeds —
            // a seed finished early can still bloom last.
            prefix += plantTime[i];
            best = max(best, prefix + growTime[i]);
        }
        return best;
    }
};
