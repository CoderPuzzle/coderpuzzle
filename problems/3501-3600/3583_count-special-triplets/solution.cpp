class Solution {
  public:
    int specialTriplets(vector<int> &nums) {
        // Sweep the middle index j while keeping counts of every value
        // strictly left and strictly right of it: j with v = nums[j]
        // contributes left[2v] * right[2v]. Counts fit in ints but the
        // product reaches 2.5 * 10^9 and the total up to C(10^5, 3) ≈
        // 1.7 * 10^14, so the accumulator is long long; the modulo lands
        // once at the end.
        vector<int> right(200001, 0), left(200001, 0);
        for (int x : nums)
            right[x]++;
        long long ans = 0;
        for (int v : nums) {
            right[v]--;
            ans += (long long)left[2 * v] * right[2 * v];
            left[v]++;
        }
        return (int)(ans % 1000000007);
    }
};
