class Solution {
  public:
    vector<int> successfulPairs(vector<int> &spells, vector<int> &potions, long long success) {
        // a pair works iff spell * potion >= success, i.e. potion >= need;
        // successful potions are exactly the strongest suffix of the sorted array
        sort(potions.begin(), potions.end());
        int n = spells.size();
        int m = potions.size();
        vector<int> res(n);
        for (int i = 0; i < n; i++) {
            // ceil(success / spell) in integer arithmetic: exact even at 1e10
            long long need = (success + spells[i] - 1) / spells[i];
            // first index with potions[idx] >= need
            int lo = 0, hi = m;
            while (lo < hi) {
                int mid = lo + (hi - lo) / 2;
                if ((long long)potions[mid] >= need)
                    hi = mid;
                else
                    lo = mid + 1;
            }
            // every potion from lo on is >= need: that suffix all succeeds
            res[i] = m - lo;
        }
        return res;
    }
};
