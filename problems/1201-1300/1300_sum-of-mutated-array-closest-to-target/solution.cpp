class Solution {
  public:
    int findBestValue(vector<int> &arr, int target) {
        int hi = *max_element(arr.begin(), arr.end());
        int lo = 0;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (mutatedSum(arr, mid) >= (long long)target)
                hi = mid;
            else
                lo = mid + 1;
        }
        long long below = mutatedSum(arr, lo - 1);
        long long at = mutatedSum(arr, lo);
        if (llabs(below - target) <= llabs(at - target)) {
            return lo - 1;
        }
        return lo;
    }

  private:
    long long mutatedSum(vector<int> &arr, int value) {
        long long sum = 0;
        for (int x : arr) {
            sum += min<long long>(x, value);
        }
        return sum;
    }
};
