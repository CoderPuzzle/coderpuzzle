class Solution {
  public:
    int kIncreasing(vector<int> &arr, int k) {
        int operations = 0;
        // arr[i-k] <= arr[i] only relates indices congruent mod k, so each
        // residue class is an independent subsequence.
        for (int start = 0; start < k; start++) {
            vector<int> sub;
            for (int i = start; i < (int)arr.size(); i += k) {
                sub.push_back(arr[i]);
            }
            // Keep the LNDS unchanged and rewrite everything else; values
            // are free, so any kept subsequence can be completed.
            operations += (int)sub.size() - longestNondecreasing(sub);
        }
        return operations;
    }

  private:
    int longestNondecreasing(vector<int> &seq) {
        // Patience trick: tails[l] is the smallest possible tail of a
        // non-decreasing subsequence of length l+1.
        vector<int> tails;
        for (int value : seq) {
            // upper_bound finds the first tail strictly greater than value —
            // equal elements extend the subsequence instead of replacing,
            // which is what makes it non-decreasing.
            auto it = upper_bound(tails.begin(), tails.end(), value);
            if (it == tails.end()) {
                tails.push_back(value);
            } else {
                *it = value;
            }
        }
        return (int)tails.size();
    }
};
