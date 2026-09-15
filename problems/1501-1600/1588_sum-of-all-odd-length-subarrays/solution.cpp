class Solution {
  public:
    int sumOddLengthSubarrays(vector<int> &arr) {
        // For each index i, left = i + 1 choices for the subarray's start
        // and right = n - i choices for its end; among those left * right
        // subarrays through i, exactly ceil(left * right / 2) have odd
        // length. Sum arr[i] times that count over every index.
        int n = arr.size();
        int total = 0;
        for (int i = 0; i < n; i++) {
            int left = i + 1;
            int right = n - i;
            int oddCount = (left * right + 1) / 2;
            total += arr[i] * oddCount;
        }
        return total;
    }
};
