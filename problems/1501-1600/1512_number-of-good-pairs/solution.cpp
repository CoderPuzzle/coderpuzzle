class Solution {
  public:
    long long numIdenticalPairs(vector<int> &nums) {
        // For each value, the k-th time it is seen forms a good pair with
        // each of the k - 1 occurrences already counted, so adding the
        // running count before bumping it reproduces C(count, 2) per value.
        unordered_map<int, long long> seen;
        long long total = 0;
        for (int num : nums) {
            total += seen[num];
            seen[num]++;
        }
        return total;
    }
};
