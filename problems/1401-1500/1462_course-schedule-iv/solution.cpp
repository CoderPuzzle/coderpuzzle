class Solution {
  public:
    vector<bool> checkIfPrerequisite(int numCourses, vector<vector<int>> &prerequisites, vector<vector<int>> &queries) {
        vector<vector<int>> adjacency(numCourses);
        vector<int> indegree(numCourses, 0);
        for (const vector<int> &pair : prerequisites) {
            adjacency[pair[0]].push_back(pair[1]);
            indegree[pair[1]]++;
        }
        int words = (numCourses + 63) / 64;
        // reach[v] is a bitset of the courses that reach course v
        vector<vector<unsigned long long>> reach(numCourses, vector<unsigned long long>(words, 0ULL));
        vector<int> queue;
        queue.reserve(numCourses);
        for (int i = 0; i < numCourses; i++) {
            if (indegree[i] == 0) {
                queue.push_back(i);
            }
        }
        for (size_t head = 0; head < queue.size(); head++) {
            int u = queue[head];
            for (int v : adjacency[u]) {
                reach[v][u >> 6] |= 1ULL << (u & 63);
                for (int w = 0; w < words; w++) {
                    reach[v][w] |= reach[u][w];
                }
                if (--indegree[v] == 0) {
                    queue.push_back(v);
                }
            }
        }
        vector<bool> answer;
        answer.reserve(queries.size());
        for (const vector<int> &query : queries) {
            int u = query[0], v = query[1];
            answer.push_back((reach[v][u >> 6] >> (u & 63)) & 1ULL);
        }
        return answer;
    }
};
