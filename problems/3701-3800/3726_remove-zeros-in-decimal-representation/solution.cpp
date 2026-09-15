class Solution {
  public:
    long long removeZeros(long long n) {
        // Rebuild the answer while peeling digits off n's least significant
        // end: place tracks the slot the next surviving digit occupies, and
        // zero digits fall through without touching result or place. long
        // long keeps n (up to 10^15) and the packed result in range.
        long long result = 0;
        long long place = 1;
        while (n > 0) {
            long long digit = n % 10;
            if (digit != 0) {
                result += digit * place;
                place *= 10;
            }
            n /= 10;
        }
        return result;
    }
};
