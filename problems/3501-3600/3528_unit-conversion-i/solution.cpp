class Solution {
  public:
    vector<int> baseUnitConversions(vector<vector<int>> &conversions) {
        // The conversions form a directed tree rooted at unit 0, so one BFS
        // fixes every answer: a child costs `factor` units per unit of its
        // parent, so its value is the parent's value times the factor. A
        // product reaches (10^9 + 6) * 10^9 ~ 10^18, so the multiply is a
        // long long reduced modulo 10^9 + 7 before storing back into the
        // int result. The vector-as-queue keeps the walk iterative — a 10^5
        // chain would overflow the stack if this were recursive.
        const long long MOD = 1000000007;
        int n = static_cast<int>(conversions.size()) + 1;
        vector<vector<pair<int, int>>> children(n);
        for (const vector<int> &edge : conversions) {
            children[edge[0]].push_back({edge[1], edge[2]});
        }
        vector<int> result(n, 0);
        result[0] = 1;
        vector<int> queue;
        queue.reserve(n);
        queue.push_back(0);
        for (size_t head = 0; head < queue.size(); ++head) {
            int node = queue[head];
            for (const pair<int, int> &child : children[node]) {
                result[child.first] = static_cast<int>(static_cast<long long>(result[node]) * child.second % MOD);
                queue.push_back(child.first);
            }
        }
        return result;
    }
};
