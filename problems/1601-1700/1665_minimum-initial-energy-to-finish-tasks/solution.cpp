class Solution {
  public:
    long long minimumEffort(vector<vector<int>> &tasks) {
        // Order by slack (minimum - actual) descending: a high-slack task
        // done early banks its surplus while the budget is still high —
        // exchange arguments show an adjacent inversion never helps.
        sort(tasks.begin(), tasks.end(),
             [](const vector<int> &a, const vector<int> &b) { return (b[1] - b[0]) < (a[1] - a[0]); });
        long long spent = 0;
        long long answer = 0;
        for (auto &task : tasks) {
            // Each task needs current energy >= its minimum, so the answer
            // is the largest prefix requirement; only `actual` is consumed.
            answer = max(answer, spent + task[1]);
            spent += task[0];
        }
        return answer;
    }
};
