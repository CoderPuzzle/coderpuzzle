class Solution {
  public:
    vector<int> duplicateZeros(vector<int> &arr) {
        // Two-pointer write from the end: every element is written to a
        // position at or to the right of its source, so no unread value is
        // ever overwritten. `i` reads the original array, `j` writes into
        // the extended one; writes with j beyond the real length fall off.
        int n = arr.size();
        int zeros = count(arr.begin(), arr.end(), 0);
        int i = n - 1;
        int j = n + zeros - 1;
        while (i >= 0) {
            if (j < n)
                arr[j] = arr[i];
            --j;
            if (arr[i] == 0) {
                if (j < n)
                    arr[j] = 0;
                --j;
            }
            --i;
        }
        return arr;
    }
};
