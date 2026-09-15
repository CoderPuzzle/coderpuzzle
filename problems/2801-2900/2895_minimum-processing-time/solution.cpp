class Solution {
  public:
    int minProcessingTime(vector<int> &processorTime, vector<int> &tasks) {
        // Every term is at most 10^9, so each pair sum stays inside int.
        sort(processorTime.begin(), processorTime.end());
        sort(tasks.rbegin(), tasks.rend());
        int answer = 0;
        for (int i = 0; i < (int)tasks.size(); ++i) {
            answer = max(answer, processorTime[i / 4] + tasks[i]);
        }
        return answer;
    }
};
