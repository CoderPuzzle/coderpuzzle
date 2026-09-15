class Solution {
  public:
    int waysToPartition(vector<int> &nums, int k) {
        long long total = accumulate(nums.begin(), nums.end(), 0LL);
        unordered_map<long long, int> right;
        long long prefix = 0;
        for (int pivot = 1; pivot < (int)nums.size(); ++pivot) {
            prefix += nums[pivot - 1];
            ++right[2 * prefix - total];
        }

        unordered_map<long long, int> left;
        int answer = right[0];
        prefix = 0;
        for (int index = 0; index < (int)nums.size(); ++index) {
            long long delta = (long long)k - nums[index];
            answer = max(answer, left[delta] + right[-delta]);

            if (index < (int)nums.size() - 1) {
                prefix += nums[index];
                long long difference = 2 * prefix - total;
                --right[difference];
                ++left[difference];
            }
        }

        return answer;
    }
};
