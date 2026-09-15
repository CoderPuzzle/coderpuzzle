class Solution {
  public:
    int earliestFinishTime(vector<int> &landStartTime, vector<int> &landDuration, vector<int> &waterStartTime,
                           vector<int> &waterDuration) {
        // Delaying a boarding past an opening never helps, and an earlier
        // first finish never pushes the second boarding later: the second
        // leg starts at max(first finish, second opening). Price both
        // orders for every pair and keep the cheapest.
        int best = INT_MAX;
        for (size_t i = 0; i < landStartTime.size(); ++i) {
            for (size_t j = 0; j < waterStartTime.size(); ++j) {
                const int land_done = landStartTime[i] + landDuration[i];
                const int water_done = waterStartTime[j] + waterDuration[j];
                const int land_first = max(land_done, waterStartTime[j]) + waterDuration[j];
                const int water_first = max(water_done, landStartTime[i]) + landDuration[i];
                best = min(best, min(land_first, water_first));
            }
        }
        return best;
    }
};
