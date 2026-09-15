import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[] splitIntoFibonacci(String num) {
        // Only the first two pieces of a split are free — every later term
        // is the sum of the two before it — so a candidate split is nothing
        // but a pair of cuts. Try cut pairs shortest piece first (a term
        // fits in 32 bits, so ten digits cap each piece), follow the forced
        // run under each pair, and return the first sequence that consumes
        // the string: exactly the shortest-first split the statement pins.
        final long limit = 2147483647L;
        final int n = num.length();
        for (int i = 1; i <= Math.min(10, n - 2); i++) {
            if (num.charAt(0) == '0' && i > 1) {
                break;
            }
            long a = Long.parseLong(num.substring(0, i));
            if (a > limit) {
                break;
            }
            for (int j = i + 1; j <= Math.min(i + 10, n - 1); j++) {
                if (num.charAt(i) == '0' && j - i > 1) {
                    break;
                }
                long b = Long.parseLong(num.substring(i, j));
                if (b > limit) {
                    break;
                }
                List<Integer> seq = new ArrayList<>();
                seq.add((int) a);
                seq.add((int) b);
                int pos = j;
                long x = a,
                    y = b;
                while (pos < n) {
                    long z = x + y;
                    if (z > limit) {
                        break;
                    }
                    String s = Long.toString(z);
                    if (!num.startsWith(s, pos)) {
                        break;
                    }
                    seq.add((int) z);
                    pos += s.length();
                    x = y;
                    y = z;
                }
                if (pos == n) {
                    int[] out = new int[seq.size()];
                    for (int k = 0; k < out.length; k++) {
                        out[k] = seq.get(k);
                    }
                    return out;
                }
            }
        }
        return new int[0];
    }
}
