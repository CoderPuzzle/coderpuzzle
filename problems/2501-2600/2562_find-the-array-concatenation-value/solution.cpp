class Solution {
  public:
    long long findTheArrayConcVal(vector<int> &nums) {
        // Two pointers eat the array from both ends; every round folds
        // first * 10^digits(last) + last into the running value. This is
        // exactly concat(first, last) without any string round-trip.
        long long answer = 0;
        int left = 0, right = (int)nums.size() - 1;
        while (left < right) {
            // Peel decimal digits off the last element to build the shift
            // factor the concatenation needs.
            long long scale = 10;
            int tail = nums[right];
            while (tail >= 10) {
                tail /= 10;
                scale *= 10;
            }
            answer += (long long)nums[left] * scale + nums[right];
            left++;
            right--;
        }
        // Odd length: the surviving middle element joins the total alone.
        if (left == right)
            answer += nums[left];
        return answer;
    }
};
