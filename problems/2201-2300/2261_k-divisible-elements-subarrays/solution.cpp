class Solution {
  public:
    int countDistinct(vector<int> &nums, int k, int p) {
        // dedup by content: the comma-joined string identifies a subarray
        unordered_set<string> seen;
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            // for each left endpoint i, extend j, tracking the running count of
            // elements divisible by p
            int divisible = 0;
            string cur;
            for (int j = i; j < n; j++) {
                if (nums[j] % p == 0)
                    divisible += 1;
                // the separator keeps [1,2] and [12] distinct
                if (!cur.empty())
                    cur += ',';
                cur += to_string(nums[j]);
                // over the limit: any longer extension stays over, so stop extending
                if (divisible > k)
                    break;
                seen.insert(cur);
            }
        }
        return (int)seen.size();
    }
};
