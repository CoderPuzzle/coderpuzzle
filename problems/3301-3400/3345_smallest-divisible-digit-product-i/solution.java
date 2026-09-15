class Solution {

    public int smallestNumber(int n, int t) {
        // Brute force: step up from n until the digit product divides by
        // t. Any run of 10 consecutive integers contains a multiple of 10,
        // whose digit product 0 is divisible by every t >= 1, so the loop
        // needs at most 10 steps.
        while (digitProduct(n) % t != 0) {
            n++;
        }
        return n;
    }

    private int digitProduct(int value) {
        int product = 1;
        while (value > 0) {
            product *= value % 10;
            value /= 10;
        }
        return product;
    }
}
