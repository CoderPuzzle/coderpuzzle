class Solution {
  public:
    long long maxScore(int n, vector<vector<int>> &edges) {
        // Connected with every degree <= 2, the graph is one path
        // (m == n - 1) or one cycle (m == n). Pendulum the values 1..n —
        // 1, 3, 5, ... then ..., 6, 4, 2 — so the largest values sit side
        // by side. Scores reach ~n^3/6 ≈ 2e13, so long long, not int.
        vector<int> seq;
        seq.reserve(n);
        for (int v = 1; v <= n; v += 2)
            seq.push_back(v);
        for (int v = n % 2 == 0 ? n : n - 1; v >= 2; v -= 2)
            seq.push_back(v);
        long long score = 0;
        for (int i = 0; i + 1 < n; i++)
            score += (long long)seq[i] * seq[i + 1];
        if ((int)edges.size() == n)
            score += (long long)seq[0] * seq[n - 1];
        return score;
    }
};
