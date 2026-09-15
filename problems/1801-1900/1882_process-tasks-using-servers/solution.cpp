class Solution {
  public:
    // free is ordered (weight, index); busy is ordered by release time.
    // Drain finished servers, wait for the earliest if needed, then hand
    // the task to the smallest free server.
    vector<long long> assignTasks(vector<int> &servers, vector<int> &tasks) {
        priority_queue<pair<long long, long long>, vector<pair<long long, long long>>, greater<>> busy;
        set<pair<long long, long long>> free;
        for (int i = 0; i < (int)servers.size(); i++) {
            free.insert({servers[i], (long long)i});
        }
        vector<long long> ans;
        ans.reserve(tasks.size());
        long long cur = 0;
        auto drain = [&](long long upto) {
            while (!busy.empty() && busy.top().first <= upto) {
                auto [rel, enc] = busy.top();
                busy.pop();
                free.insert({enc / 200001LL, enc % 200001LL});
            }
        };
        for (int j = 0; j < (int)tasks.size(); j++) {
            cur = max(cur, (long long)j);
            drain(cur);
            if (free.empty()) {
                cur = busy.top().first;
                drain(cur);
            }
            auto it = free.begin();
            pair<long long, long long> pick = *it;
            free.erase(it);
            busy.push({cur + tasks[j], pick.first * 200001LL + pick.second});
            ans.push_back(pick.second);
        }
        return ans;
    }
};
