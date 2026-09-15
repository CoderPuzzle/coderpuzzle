class Solution {
  public:
    int maximumDetonation(vector<vector<int>> &bombs) {
        int count = static_cast<int>(bombs.size());
        vector<vector<int>> graph(count);
        for (int source = 0; source < count; ++source) {
            for (int target = 0; target < count; ++target) {
                long long dx = static_cast<long long>(bombs[source][0]) - bombs[target][0];
                long long dy = static_cast<long long>(bombs[source][1]) - bombs[target][1];
                long long radius = bombs[source][2];
                if (dx * dx + dy * dy <= radius * radius) {
                    graph[source].push_back(target);
                }
            }
        }

        int answer = 0;
        for (int start = 0; start < count; ++start) {
            vector<bool> seen(count);
            vector<int> stack = {start};
            seen[start] = true;
            int reached = 0;
            while (!stack.empty()) {
                int source = stack.back();
                stack.pop_back();
                ++reached;
                for (int target : graph[source]) {
                    if (!seen[target]) {
                        seen[target] = true;
                        stack.push_back(target);
                    }
                }
            }
            answer = max(answer, reached);
        }
        return answer;
    }
};
