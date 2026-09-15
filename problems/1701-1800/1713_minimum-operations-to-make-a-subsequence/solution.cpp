class Solution {
  public:
    int minOperations(vector<int> &target, vector<int> &arr) {
        // Answer = target.size() - LCS: each target element not kept costs
        // one insertion. target has distinct values, so rewriting arr as
        // target indices turns the LCS into a longest strictly increasing run.
        unordered_map<int, int> index;
        index.reserve(target.size() * 2);
        for (int i = 0; i < (int)target.size(); i++) {
            index[target[i]] = i;
        }
        // Patience sorting: tails[k] = smallest tail of an increasing
        // subsequence of length k+1; lower_bound keeps it strictly increasing
        // (duplicate arr values map to one index and replace in place).
        vector<int> tails;
        tails.reserve(arr.size());
        for (int value : arr) {
            // Absent values never join a common subsequence and may stay.
            auto it = index.find(value);
            if (it == index.end())
                continue;
            int v = it->second;
            auto pos = lower_bound(tails.begin(), tails.end(), v);
            if (pos == tails.end())
                tails.push_back(v);
            else
                *pos = v;
        }
        return (int)target.size() - (int)tails.size();
    }
};
