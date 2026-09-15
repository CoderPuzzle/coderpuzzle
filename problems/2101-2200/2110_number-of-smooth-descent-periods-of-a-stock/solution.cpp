class Solution {
  public:
    long long getDescentPeriods(vector<int> &prices) {
        long long total = 1;
        long long run = 1;
        for (int index = 1; index < static_cast<int>(prices.size()); ++index) {
            run = prices[index - 1] - prices[index] == 1 ? run + 1 : 1;
            total += run;
        }
        return total;
    }
};
