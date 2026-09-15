class Solution {
  public:
    int countValidSubarrays(vector<int> &nums, int x) {
        int answer = 0;
        for (int left = 0; left < nums.size(); ++left) {
            long long sum = 0;
            for (int right = left; right < nums.size(); ++right) {
                sum += nums[right];
                long long first = sum;
                while (first >= 10)
                    first /= 10;
                if (first == x && sum % 10 == x)
                    ++answer;
            }
        }
        return answer;
    }
};
