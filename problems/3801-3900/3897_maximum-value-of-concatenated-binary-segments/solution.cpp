#include <algorithm>
#include <numeric>
#include <vector>

class Solution {
  public:
    int maxValue(vector<int> &nums1, vector<int> &nums0) {
        vector<int> order(nums1.size());
        iota(order.begin(), order.end(), 0);
        auto category = [&](int index) {
            if (nums0[index] == 0)
                return 0;
            if (nums1[index] == 0)
                return 2;
            return 1;
        };
        sort(order.begin(), order.end(), [&](int left, int right) {
            int leftCategory = category(left);
            int rightCategory = category(right);
            if (leftCategory != rightCategory)
                return leftCategory < rightCategory;
            if (leftCategory != 1)
                return false;
            if (nums1[left] != nums1[right])
                return nums1[left] > nums1[right];
            return nums0[left] < nums0[right];
        });

        const long long modulus = 1000000007;
        long long answer = 0;
        for (int index : order) {
            for (int count = 0; count < nums1[index]; ++count)
                answer = (answer * 2 + 1) % modulus;
            for (int count = 0; count < nums0[index]; ++count)
                answer = answer * 2 % modulus;
        }
        return (int)answer;
    }
};
