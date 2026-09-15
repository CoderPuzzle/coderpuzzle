class Solution {
  public:
    vector<int> maxHammingDistances(vector<int> &nums, int m) {
        // HD(x, y) + HD(~x, y) = m, so max distance from x = m - minDist(~x).
        int size = 1 << m;
        int full = size - 1;
        vector<int> dist(size, size + 1);
        queue<int> q;
        // Seed each distinct value at 0; dist == 0 doubles as the seen marker.
        for (int value : nums) {
            if (dist[value] != 0) {
                dist[value] = 0;
                q.push(value);
            }
        }
        // One bit flip = one Hamming step; unit edges make first reach shortest.
        while (!q.empty()) {
            int v = q.front();
            q.pop();
            int nd = dist[v] + 1;
            for (int bit = 0; bit < m; bit++) {
                int u = v ^ (1 << bit);
                if (dist[u] > nd) {
                    dist[u] = nd;
                    q.push(u);
                }
            }
        }
        // The complement's closest element is x's farthest.
        vector<int> result;
        result.reserve(nums.size());
        for (int x : nums)
            result.push_back(m - dist[full ^ x]);
        return result;
    }
};
