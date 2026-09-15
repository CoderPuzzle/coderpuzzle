class Solution {

    public long sumAndMultiply(int n) {
        // One pass peels n's digits least-significant first: each nonzero
        // digit joins the packed value x at the place slot it earns and
        // joins the digit sum; zeros fall through untouched, so x ends up
        // holding the surviving digits in their original order. The long
        // return carries products up to 999999999 * 81, past int range.
        long x = 0;
        long place = 1;
        long total = 0;
        for (int m = n; m > 0; m /= 10) {
            int digit = m % 10;
            if (digit != 0) {
                x += digit * place;
                place *= 10;
                total += digit;
            }
        }
        return x * total;
    }
}
