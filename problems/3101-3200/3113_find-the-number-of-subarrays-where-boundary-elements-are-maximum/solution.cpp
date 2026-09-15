class Solution {
  public:
    long long numberOfSubarrays(vector<int> &nums) {
        int n = nums.size();
        // leftGreater[i]: nearest index to the left with a strictly greater value
        vector<int> leftGreater(n, -1);
        vector<int> stack;
        stack.reserve(n);
        for (int i = 0; i < n; i++) {
            int x = nums[i];
            // values <= x can never be the nearest greater for a later element
            while (!stack.empty() && nums[stack.back()] <= x) {
                stack.pop_back();
            }
            leftGreater[i] = stack.empty() ? -1 : stack.back();
            stack.push_back(i);
        }

        // earlier positions of each value, always appended in increasing order
        unordered_map<int, vector<int>> positions;
        long long ans = 0;
        for (int i = 0; i < n; i++) {
            int x = nums[i];
            vector<int> &lst = positions[x];
            // hand-rolled bisect_right: first position beyond leftGreater[i]
            int lo = 0, hi = (int)lst.size();
            while (lo < hi) {
                int mid = lo + (hi - lo) / 2;
                if (lst[mid] <= leftGreater[i]) {
                    lo = mid + 1;
                } else {
                    hi = mid;
                }
            }
            // equal-value starts beyond leftGreater[i], plus the singleton [i..i]
            long long count = 1LL + (long long)lst.size() - lo;
            ans += count;
            lst.push_back(i);
        }
        return ans;
    }
};
