class Solution {
  public:
    int totalSteps(vector<int> &nums) {
        vector<pair<long long, long long>> st; // (value, step)
        long long ans = 0;
        for (int x : nums) {
            long long cur = 0;
            while (!st.empty() && st.back().first <= x) {
                long long popped = st.back().second;
                st.pop_back();
                if (popped > cur)
                    cur = popped;
            }
            if (!st.empty())
                cur += 1;
            else
                cur = 0;
            st.push_back({(long long)x, cur});
            if (cur > ans)
                ans = cur;
        }
        return (int)ans;
    }
};
