class Solution {
  public:
    int maxProduct(int n) {
        // All digits are >= 0, so the best pair product is the product of
        // the two largest digits; sorting the (at most 10) digits and
        // taking the top two answers every case, repeated digits included.
        string digits = to_string(n);
        sort(digits.begin(), digits.end());
        int top = digits.back() - '0';
        int second = digits[digits.size() - 2] - '0';
        return top * second;
    }
};
