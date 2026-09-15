class Solution {
  public:
    long long countMajoritySubarrays(vector<int> &nums, int target) {
        // A subarray holds target as its majority element exactly when
        // target outnumbers everything else in it, so score each element +1
        // when it equals target and -1 otherwise: the subarray qualifies
        // precisely when its score sum is positive. With pref[0] = 0 and
        // pref[k] = pref[k - 1] + the score of nums[k - 1], the task
        // becomes counting pairs i < j with pref[i] < pref[j].
        //
        // Sweep the prefixes with a Fenwick tree over the value range:
        // scores move the prefix one step either way, so every prefix lies
        // in [-n, n] and an offset maps it onto 1..2n + 1 with no
        // compression needed. Each position is queried before it is
        // inserted, which keeps i < j automatic; the strictness skips tied
        // prefixes — windows where target fills exactly half and does not
        // count as a majority. The answer reaches n(n + 1) / 2, past 32
        // bits at this n, so it accumulates in 64-bit width.
        int n = nums.size();
        int size = 2 * n + 1;
        vector<long long> tree(size + 1, 0);
        // Seed the tree with pref[0] = 0, stored at index n + 1.
        for (int index = n + 1; index <= size; index += index & -index)
            ++tree[index];
        long long answer = 0;
        int pref = 0;
        for (int x : nums) {
            pref += x == target ? 1 : -1;
            // Earlier prefixes strictly below pref sit at indices <= pref+n.
            for (int index = pref + n; index > 0; index &= index - 1)
                answer += tree[index];
            // Insert pref at index pref + n + 1.
            for (int index = pref + n + 1; index <= size; index += index & -index)
                ++tree[index];
        }
        return answer;
    }
};
