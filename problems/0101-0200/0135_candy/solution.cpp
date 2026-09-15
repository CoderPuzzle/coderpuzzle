class Solution {
  public:
    int candy(vector<int> &ratings) {
        int n = (int)ratings.size();
        // One candy per child is the minimum allowed.
        vector<int> candies(n, 1);
        // Left-to-right: enforce the left-neighbor rule with the smallest
        // value exceeding the left neighbor's allotment.
        for (int i = 1; i < n; i++) {
            if (ratings[i] > ratings[i - 1]) {
                candies[i] = candies[i - 1] + 1;
            }
        }
        // Right-to-left: enforce the right-neighbor rule symmetrically. The
        // max only raises a count, never lowers it, so these fixes cannot
        // undo the first pass's left-neighbor guarantees.
        for (int i = n - 2; i >= 0; i--) {
            if (ratings[i] > ratings[i + 1]) {
                candies[i] = max(candies[i], candies[i + 1] + 1);
            }
        }
        long long total = 0;
        for (int value : candies) {
            total += value;
        }
        return (int)total;
    }
};
