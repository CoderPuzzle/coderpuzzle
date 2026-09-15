import java.util.Arrays;

class Solution {

    public int[] getGoodIndices(int[][] variables, int target) {
        // Binary exponentiation keeps every intermediate below the modulus
        // squared; mod can be 1, so the seed starts at 1 % mod. Last digit
        // of a^b first (mod 10), then that residue raised to c modulo m —
        // residues stay below 10^3, so squaring fits easily in a long. The
        // index is good exactly when the second residue equals target.
        int[] good = new int[variables.length];
        int count = 0;
        for (int i = 0; i < variables.length; ++i) {
            int[] row = variables[i];
            if (modPow(modPow(row[0], row[1], 10), row[2], row[3]) == target) {
                good[count++] = i;
            }
        }
        return Arrays.copyOf(good, count);
    }

    private long modPow(long base, int exp, int mod) {
        long result = 1 % mod;
        base %= mod;
        while (exp > 0) {
            if ((exp & 1) != 0) {
                result = (result * base) % mod;
            }
            base = (base * base) % mod;
            exp >>= 1;
        }
        return result;
    }
}
