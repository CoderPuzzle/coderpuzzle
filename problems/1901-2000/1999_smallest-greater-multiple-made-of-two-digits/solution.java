import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class Solution {

    public int findInteger(int k, int digit1, int digit2) {
        // The only numbers that can qualify are those whose decimal
        // representation uses just {digit1, digit2}; there are at most
        // 2 + 4 + ... + 2^10 = 2046 of them up to 10 digits (11-digit
        // values already exceed 2^31 - 1). Generate every one, sort the
        // list, and scan for the first value that is > k and divisible
        // by k. A number never starts with 0, so seed the generation
        // with the nonzero digits only. Values reach 10^10, so build
        // them in 64-bit arithmetic.
        List<Long> digits = new ArrayList<>();
        digits.add((long) digit1);
        if (digit2 != digit1) {
            digits.add((long) digit2);
        }
        Collections.sort(digits);
        List<Long> cur = new ArrayList<>();
        for (long d : digits) {
            if (d != 0) {
                cur.add(d);
            }
        }
        List<Long> cands = new ArrayList<>();
        for (int len = 0; len < 10; len++) {
            cands.addAll(cur);
            List<Long> nxt = new ArrayList<>();
            for (long v : cur) {
                for (long d : digits) {
                    nxt.add(v * 10 + d);
                }
            }
            cur = nxt;
        }
        Collections.sort(cands);
        for (long v : cands) {
            if (v > 2147483647L) {
                break;
            }
            if (v > k && v % k == 0) {
                return (int) v;
            }
        }
        return -1;
    }
}
