class Solution {
  public:
    // Counting sort: tally each price, then sweep prices from cheapest.
    // Buying cheapest-first is optimal, and the tally makes that walk
    // O(max_price) instead of O(n log n).
    int maxIceCream(vector<int> &costs, int coins) {
        vector<int> count(100001, 0);
        for (int c : costs) {
            count[c]++;
        }
        int bought = 0;
        for (int price = 1; price <= 100000; price++) {
            if (count[price] == 0 || price > coins) {
                continue;
            }
            int afford = min(count[price], coins / price);
            bought += afford;
            coins -= afford * price;
            if (coins == 0) {
                break;
            }
        }
        return bought;
    }
};
