class Solution {
  public:
    vector<int> getAverages(vector<int> &nums, int k) {
        vector<int> averages(nums.size(), -1);
        int width = 2 * k + 1;
        if (width > static_cast<int>(nums.size())) {
            return averages;
        }

        long long windowSum = 0;
        for (int index = 0; index < width; index++) {
            windowSum += nums[index];
        }
        averages[k] = windowSum / width;
        for (int center = k + 1; center < static_cast<int>(nums.size()) - k; center++) {
            windowSum += nums[center + k];
            windowSum -= nums[center - k - 1];
            averages[center] = windowSum / width;
        }
        return averages;
    }
};
