class Solution {
  public:
    int countGoodTriplets(vector<int> &arr, int a, int b, int c) {
        // n is capped at 100, so the naive O(n^3) triple loop is intended:
        // walk every ordered index triple i < j < k and test the three
        // pairwise bounds directly.
        int n = (int)arr.size();
        int count = 0;
        for (int i = 0; i < n; ++i) {
            for (int j = i + 1; j < n; ++j) {
                if (abs(arr[i] - arr[j]) > a)
                    continue;
                for (int k = j + 1; k < n; ++k) {
                    if (abs(arr[j] - arr[k]) <= b && abs(arr[i] - arr[k]) <= c) {
                        ++count;
                    }
                }
            }
        }
        return count;
    }
};
