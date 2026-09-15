#include <algorithm>
#include <vector>

class Solution {
  public:
    int countElements(vector<int> &nums, int k) {
        // Sorting lines every element up with its rank: the elements
        // strictly greater than a value are exactly the sorted suffix
        // after that value's run. The whole count hangs on one threshold,
        // the value at sorted index t = n - k - 1.
        vector<int> ordered = nums;
        sort(ordered.begin(), ordered.end());
        int n = (int)ordered.size();
        int threshold = ordered[n - k - 1];
        // Elements strictly below the threshold all qualify: their runs
        // end before it. The run AT the threshold qualifies only when its
        // last member still sees >= k strictly greater values, i.e. the
        // run ends at or before t. Values above the threshold never do.
        int left = lower_bound(ordered.begin(), ordered.end(), threshold) - ordered.begin();
        int right = upper_bound(ordered.begin(), ordered.end(), threshold) - ordered.begin();
        return n - right >= k ? right : left;
    }
};
