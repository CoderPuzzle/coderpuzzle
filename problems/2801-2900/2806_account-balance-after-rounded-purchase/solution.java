class Solution {

    public int accountBalanceAfterPurchase(int purchaseAmount) {
        // Adding 5 before flooring to a multiple of 10 encodes the half-up
        // rounding rule: a ones digit of 0-4 stays on the lower multiple,
        // 6-9 crosses to the upper one, and an exact 5 lands on the upper
        // neighbor -- the larger of the two equally distant candidates.
        int rounded = ((purchaseAmount + 5) / 10) * 10;
        // Every intermediate stays non-negative on the constraint domain.
        return 100 - rounded;
    }
}
