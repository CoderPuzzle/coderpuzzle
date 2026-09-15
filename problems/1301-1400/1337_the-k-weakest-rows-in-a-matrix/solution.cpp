class Solution {
  public:
    vector<int> kWeakestRows(vector<vector<int>> &mat, int k) {
        // Weakness order == lexicographic order of (soldiers, index); rows
        // are all 1's then 0's, so the sum is the first-civilian index too.
        vector<pair<int, int>> ranked;
        ranked.reserve(mat.size());
        for (int i = 0; i < (int)mat.size(); ++i) {
            int soldiers = 0;
            for (int value : mat[i]) {
                soldiers += value;
            }
            ranked.emplace_back(soldiers, i);
        }
        sort(ranked.begin(), ranked.end());
        vector<int> out;
        out.reserve(k);
        for (int i = 0; i < k; ++i) {
            out.push_back(ranked[i].second);
        }
        return out;
    }
};
