class Solution {
  public:
    vector<int> findAllPeople(int n, vector<vector<int>> &meetings, int firstPerson) {
        sort(meetings.begin(), meetings.end(), [](const auto &left, const auto &right) { return left[2] < right[2]; });
        vector<bool> knows(n);
        knows[0] = true;
        knows[firstPerson] = true;
        int start = 0;
        while (start < static_cast<int>(meetings.size())) {
            int end = start;
            unordered_map<int, vector<int>> graph;
            while (end < static_cast<int>(meetings.size()) && meetings[end][2] == meetings[start][2]) {
                int x = meetings[end][0];
                int y = meetings[end][1];
                graph[x].push_back(y);
                graph[y].push_back(x);
                ++end;
            }

            queue<int> pending;
            for (const auto &[person, _] : graph) {
                if (knows[person])
                    pending.push(person);
            }
            while (!pending.empty()) {
                int person = pending.front();
                pending.pop();
                for (int other : graph[person]) {
                    if (!knows[other]) {
                        knows[other] = true;
                        pending.push(other);
                    }
                }
            }
            start = end;
        }

        vector<int> answer;
        for (int person = 0; person < n; ++person) {
            if (knows[person])
                answer.push_back(person);
        }
        return answer;
    }
};
