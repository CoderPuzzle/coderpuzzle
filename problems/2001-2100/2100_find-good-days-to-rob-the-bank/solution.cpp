class Solution {
  public:
    vector<int> goodDaysToRobBank(vector<int> &security, int time) {
        int n = static_cast<int>(security.size());
        vector<int> before(n);
        vector<int> after(n);
        for (int day = 1; day < n; ++day) {
            if (security[day - 1] >= security[day])
                before[day] = before[day - 1] + 1;
        }
        for (int day = n - 2; day >= 0; --day) {
            if (security[day] <= security[day + 1])
                after[day] = after[day + 1] + 1;
        }
        vector<int> answer;
        for (int day = 0; day < n; ++day) {
            if (before[day] >= time && after[day] >= time)
                answer.push_back(day);
        }
        return answer;
    }
};
