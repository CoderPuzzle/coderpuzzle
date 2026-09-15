class Solution {
  public:
    vector<vector<int>> findMatrix(vector<int> &nums) {
        // A value's k-th occurrence (counted from zero) always belongs to row
        // k: each row must hold distinct elements, so earlier copies can only
        // have occupied strictly earlier rows. Appending there therefore never
        // duplicates within a row, the rows stay minimal because one opens only
        // when a repeat forces a deeper level, and scanning in input order
        // keeps the construction fully deterministic.
        unordered_map<int, int> seen;
        vector<vector<int>> rows;
        for (int value : nums) {
            int rank = seen[value]++;
            if (rank == (int)rows.size())
                rows.push_back({});
            rows[rank].push_back(value);
        }
        return rows;
    }
};
