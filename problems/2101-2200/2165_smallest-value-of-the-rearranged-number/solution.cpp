class Solution {
  public:
    long long smallestNumber(long long num) {
        // The sign only picks the sort direction: a negative result is
        // smallest when its magnitude is largest (digits descending), a
        // positive one when the smallest nonzero digit leads and the
        // zeroes follow it instead of preceding it. long long holds
        // every rebuilt value (|num| <= 10^15) with room to spare.
        if (num == 0)
            return 0;
        bool negative = num < 0;
        long long magnitude = negative ? -num : num;
        string digits = to_string(magnitude);
        sort(digits.begin(), digits.end());
        if (negative) {
            reverse(digits.begin(), digits.end());
        } else {
            size_t index = digits.find_first_not_of('0');
            swap(digits[0], digits[index]);
        }
        long long value = stoll(digits);
        return negative ? -value : value;
    }
};
