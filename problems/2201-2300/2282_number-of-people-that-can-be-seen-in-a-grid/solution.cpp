class Solution {
  public:
    vector<vector<int>> seePeople(vector<vector<int>> &heights) {
        int m = heights.size();
        int n = heights[0].size();
        vector<vector<int>> res(m, vector<int>(n, 0));

        // Count people visible to the right in each row.
        for (int i = 0; i < m; i++) {
            vector<int> st;
            st.reserve(n);
            for (int j = n - 1; j >= 0; j--) {
                int x = heights[i][j];
                int cnt = 0;
                while (!st.empty() && st.back() < x) {
                    st.pop_back();
                    cnt += 1;
                }
                if (!st.empty())
                    cnt += 1;
                res[i][j] += cnt;
                while (!st.empty() && st.back() <= x) {
                    st.pop_back();
                }
                st.push_back(x);
            }
        }

        // Count people visible below in each column.
        for (int j = 0; j < n; j++) {
            vector<int> st;
            st.reserve(m);
            for (int i = m - 1; i >= 0; i--) {
                int x = heights[i][j];
                int cnt = 0;
                while (!st.empty() && st.back() < x) {
                    st.pop_back();
                    cnt += 1;
                }
                if (!st.empty())
                    cnt += 1;
                res[i][j] += cnt;
                while (!st.empty() && st.back() <= x) {
                    st.pop_back();
                }
                st.push_back(x);
            }
        }

        return res;
    }
};
