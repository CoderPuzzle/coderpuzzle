class Solution {
  public:
    int lengthOfLIS(vector<int> &nums) {
        // tails[k] = smallest value ending an increasing subsequence of
        // length k+1; it stays sorted, which licenses the binary search.
        vector<int> tails;
        for (int x : nums) {
            // lower_bound finds the first tail >= x: an equal value
            // overwrites its own tail, enforcing strict increase.
            auto it = lower_bound(tails.begin(), tails.end(), x);
            if (it == tails.end())
                // Bigger than every tail: x extends the best subsequence.
                tails.push_back(x);
            else
                // Same length, cheaper ending — more room to extend later.
                *it = x;
        }
        // tails itself need not be a real subsequence; only its length is.
        return (int)tails.size();
    }
};
