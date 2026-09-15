class Solution {
  public:
    double calculateTax(vector<vector<int>> &brackets, int income) {
        // Walk the brackets in order; each is taxed on the slice of income
        // between the previous upper bound and min(income, upper).
        long long paid = 0;
        int prev = 0;
        for (const auto &bracket : brackets) {
            int upper = bracket[0];
            int percent = bracket[1];
            if (income <= upper) {
                paid += (long long)(income - prev) * percent;
                break;
            }
            paid += (long long)(upper - prev) * percent;
            prev = upper;
        }
        // The product sum reaches 1e5 in the long long; dividing once
        // yields the correctly rounded double of the rational total.
        return paid / 100.0;
    }
};
