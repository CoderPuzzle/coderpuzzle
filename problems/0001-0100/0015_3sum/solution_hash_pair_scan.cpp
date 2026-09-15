class Solution {
  public:
    vector<vector<int>> threeSum(vector<int> &nums) {
        // Ordered set of sorted value triples: a triple that closes at
        // several positions arrives several times but is kept once, and
        // iteration hands the triples out already lexicographic -- the
        // order the statement fixes, with no final sort needed.
        set<array<int, 3>> triples;
        // Pin each distinct value once, at its first occurrence: the suffix
        // behind the first occurrence is a superset of every later one, so
        // no distinct triple is lost and identical re-scans are skipped.
        unordered_set<int> pinned;
        int n = (int)nums.size();
        for (int i = 0; i + 2 < n; i++) {
            int first = nums[i];
            // insert reports failure when the value was already pinned.
            if (!pinned.insert(first).second)
                continue;
            // Values already passed in this suffix. A complement found here
            // sits strictly between i and the closing element, so the three
            // values occupy three different positions.
            unordered_set<int> seen;
            for (int j = i + 1; j < n; j++) {
                int complement = -(first + nums[j]);
                if (seen.count(complement)) {
                    array<int, 3> triple = {first, complement, nums[j]};
                    sort(triple.begin(), triple.end());
                    triples.insert(triple);
                }
                seen.insert(nums[j]);
            }
        }
        vector<vector<int>> result;
        for (const array<int, 3> &triple : triples) {
            result.push_back(vector<int>(triple.begin(), triple.end()));
        }
        return result;
    }
};
