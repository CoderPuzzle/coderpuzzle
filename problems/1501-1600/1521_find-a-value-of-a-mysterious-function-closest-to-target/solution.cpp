class Solution {
  public:
    int closestToTarget(vector<int> &arr, int target) {
        // prev holds the distinct AND-values of every subarray ending at the
        // previous index. AND only clears bits, so this set stays small
        // (O(log(max(arr))) entries) and updates cheaply from one index to
        // the next.
        int best = abs(arr[0] - target);
        unordered_set<int> prev = {arr[0]};
        for (size_t i = 1; i < arr.size(); ++i) {
            int value = arr[i];
            unordered_set<int> cur = {value};
            for (int p : prev)
                cur.insert(p & value);
            for (int v : cur)
                best = min(best, abs(v - target));
            prev = std::move(cur);
        }
        return best;
    }
};
