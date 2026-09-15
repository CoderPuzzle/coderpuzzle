class Solution {
  public:
    vector<int> findThePrefixCommonArray(vector<int> &A, vector<int> &B) {
        // One shared walk bumps a frequency counter for each value; because
        // both arrays are permutations, a counter reaching 2 means that value
        // now appears in both prefixes, so each hit raises the running total.
        vector<int> seen(A.size() + 1, 0);
        int common = 0;
        vector<int> result;
        result.reserve(A.size());
        for (size_t index = 0; index < A.size(); ++index) {
            if (++seen[A[index]] == 2)
                common++;
            if (++seen[B[index]] == 2)
                common++;
            result.push_back(common);
        }
        return result;
    }
};
