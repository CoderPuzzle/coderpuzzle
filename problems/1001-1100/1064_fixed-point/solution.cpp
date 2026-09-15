class Solution {
  public:
    int fixedPoint(vector<int> &arr) {
        int lo = 0, hi = (int)arr.size() - 1;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (arr[mid] - mid >= 0) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return arr[lo] == lo ? lo : -1;
    }
};
