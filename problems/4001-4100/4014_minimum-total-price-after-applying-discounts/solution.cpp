class Solution {
  public:
    double minPrice(vector<int> &prices, vector<int> &discounts) {
        // Sort both descending and pair positionally: by the exchange
        // argument, largest discount on largest price maximizes p*d/100.
        sort(prices.begin(), prices.end(), greater<int>());
        sort(discounts.begin(), discounts.end(), greater<int>());
        long long saved = 0;
        long long total = 0;
        for (size_t i = 0; i < prices.size(); ++i) {
            total += prices[i];
            if (i < discounts.size()) {
                saved += (long long)prices[i] * discounts[i];
            }
        }
        // The product sum reaches 1e12 in the long long; dividing once
        // yields the correctly rounded double of the rational total.
        return (total * 100LL - saved) / 100.0;
    }
};
