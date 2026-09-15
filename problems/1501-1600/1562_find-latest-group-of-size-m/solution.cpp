class Solution {
  public:
    int findLatestStep(vector<int> &arr, int m) {
        int n = arr.size();
        // length[p] is meaningful only at the two ends of a 1-group: the
        // length of that group. Interior positions go stale once a group
        // grows past them, and are never read again.
        vector<int> length(n + 2, 0);
        // count[k] = how many groups currently have length exactly k.
        vector<int> count(n + 1, 0);
        int ans = -1;

        for (int step = 1; step <= n; step++) {
            int pos = arr[step - 1];
            int left = length[pos - 1];
            int right = length[pos + 1];
            int newLen = left + right + 1;
            length[pos - left] = newLen;
            length[pos + right] = newLen;
            if (left > 0) {
                count[left]--;
            }
            if (right > 0) {
                count[right]--;
            }
            count[newLen]++;
            if (count[m] > 0) {
                ans = step;
            }
        }

        return ans;
    }
};
