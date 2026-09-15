class Solution {
  public:
    vector<int> mostVisited(int n, vector<int> &rounds) {
        // Only the first and last sectors of the whole marathon matter: every
        // full lap around the track visits every sector once, so the total
        // visit count only differs on the final, partial lap. That partial
        // lap is exactly the arc from rounds[0] to rounds.back().
        int start = rounds.front();
        int end = rounds.back();
        vector<int> result;
        if (start <= end) {
            for (int sector = start; sector <= end; ++sector)
                result.push_back(sector);
            return result;
        }
        // The arc wraps past sector n back to sector 1.
        for (int sector = 1; sector <= end; ++sector)
            result.push_back(sector);
        for (int sector = start; sector <= n; ++sector)
            result.push_back(sector);
        return result;
    }
};
