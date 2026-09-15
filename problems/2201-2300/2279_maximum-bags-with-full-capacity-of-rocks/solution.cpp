class Solution {
  public:
    int maximumBags(vector<int> &capacity, vector<int> &rocks, int additionalRocks) {
        int n = capacity.size();
        vector<long long> needs(n);
        for (int i = 0; i < n; i++) {
            needs[i] = (long long)capacity[i] - rocks[i];
        }
        sort(needs.begin(), needs.end());
        long long remaining = additionalRocks;
        int full = 0;
        for (int i = 0; i < n && needs[i] <= remaining; i++) {
            remaining -= needs[i];
            full++;
        }
        return full;
    }
};
