class Solution {
  public:
    int earliestFinishTime(vector<int> &landStartTime, vector<int> &landDuration, vector<int> &waterStartTime,
                           vector<int> &waterDuration) {
        // Only the moment the first ride ends matters: the second ride then
        // costs max(open, finish) + duration, which never improves when the
        // hand-off gets later. So each order fixes the earliest-finishing
        // ride of the first category and scans the other category.
        int landFinish = landStartTime[0] + landDuration[0];
        for (size_t i = 1; i < landStartTime.size(); ++i) {
            landFinish = min(landFinish, landStartTime[i] + landDuration[i]);
        }
        int waterFinish = waterStartTime[0] + waterDuration[0];
        for (size_t j = 1; j < waterStartTime.size(); ++j) {
            waterFinish = min(waterFinish, waterStartTime[j] + waterDuration[j]);
        }
        int landFirst = max(waterStartTime[0], landFinish) + waterDuration[0];
        for (size_t j = 1; j < waterStartTime.size(); ++j) {
            landFirst = min(landFirst, max(waterStartTime[j], landFinish) + waterDuration[j]);
        }
        int waterFirst = max(landStartTime[0], waterFinish) + landDuration[0];
        for (size_t i = 1; i < landStartTime.size(); ++i) {
            waterFirst = min(waterFirst, max(landStartTime[i], waterFinish) + landDuration[i]);
        }
        return min(landFirst, waterFirst);
    }
};
