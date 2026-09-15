class Solution {
  public:
    int maxChunksToSorted(vector<int> &arr) {
        // Prefix maximum sweep: the first i + 1 elements are exactly the
        // set {0..i} iff their maximum is i, so each such index is a cut.
        int chunks = 0;
        int runMax = -1;
        int n = arr.size();
        for (int i = 0; i < n; i++) {
            if (arr[i] > runMax) {
                runMax = arr[i];
            }
            // A boundary lands wherever the running max equals the index:
            // every legal cut is counted, and taking all of them is optimal.
            if (runMax == i) {
                ++chunks;
            }
        }
        return chunks;
    }
};
