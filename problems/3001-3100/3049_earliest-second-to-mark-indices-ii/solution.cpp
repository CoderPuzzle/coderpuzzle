class Solution {
  public:
    int earliestSecondToMarkIndices(vector<int> &nums, vector<int> &changeIndices) {
        int n = nums.size();
        int m = changeIndices.size();

        // first occurrence (0-indexed second) of each index whose nums value is > 0
        vector<int> first(n, -1);
        for (int i = m - 1; i >= 0; i--) {
            int idx = changeIndices[i] - 1;
            if (nums[idx] != 0) {
                first[idx] = i;
            }
        }

        long long total = n;
        long long low = n;
        for (int i = 0; i < n; i++) {
            total += nums[i];
            low += (first[i] != -1 ? 1 : nums[i]);
        }
        long long high = m;
        while (low <= high) {
            long long mid = low + (high - low) / 2;
            if (check(nums, changeIndices, first, total, (int)mid)) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return low <= m ? (int)low : -1;
    }

  private:
    bool check(vector<int> &nums, vector<int> &changeIndices, vector<int> &first, long long total, int t) {
        priority_queue<long long, vector<long long>, greater<long long>> minHeap;
        long long cnt = 0;
        long long sum = 0;
        for (int i = t - 1; i >= 0; i--) {
            int idx = changeIndices[i] - 1;
            if (i != first[idx]) {
                cnt += 1;
                continue;
            }
            minHeap.push(nums[idx]);
            sum += nums[idx];
            if (cnt > 0) {
                cnt -= 1;
            } else {
                cnt += 1;
                sum -= minHeap.top();
                minHeap.pop();
            }
        }
        return total - (sum + (long long)minHeap.size()) <= cnt;
    }
};
