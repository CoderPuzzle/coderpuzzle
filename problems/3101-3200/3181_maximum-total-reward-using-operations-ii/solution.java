import java.math.BigInteger;
import java.util.Arrays;

class Solution {

    public int maxTotalReward(int[] rewardValues) {
        // Sort and dedupe; a value equal to an already taken one can never be
        // taken again (it would require value > running total >= value).
        int[] values = rewardValues.clone();
        Arrays.sort(values);
        int m = 0;
        for (int i = 0; i < values.length; i++) {
            if (i == 0 || values[i] != values[i - 1]) {
                values[m++] = values[i];
            }
        }
        // dp bit j = 1 iff total reward j is achievable.
        BigInteger dp = BigInteger.ONE;
        for (int i = 0; i < m; i++) {
            int x = values[i];
            BigInteger mask = BigInteger.ONE.shiftLeft(x).subtract(BigInteger.ONE);
            dp = dp.or(dp.and(mask).shiftLeft(x));
        }
        return dp.bitLength() - 1;
    }
}
