class Solution {
  public:
    int minimumAddedCoins(vector<int> &coins, int target) {
        sort(coins.begin(), coins.end());
        long long reach = 0; // every value in [1, reach] is obtainable
        int added = 0;
        size_t i = 0;
        while (reach < target) {
            if (i < coins.size() && coins[i] <= reach + 1) {
                reach += coins[i];
                i++;
            } else {
                // must add the coin worth reach + 1
                reach += reach + 1;
                added++;
            }
        }
        return added;
    }
};
