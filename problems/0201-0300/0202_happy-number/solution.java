import java.util.HashSet;
import java.util.Set;

class Solution {

    public boolean isHappy(int n) {
        // The digit-square map is deterministic, so iterating it must reach
        // 1 (a fixed point) or cycle; add() reporting a duplicate (false)
        // means a revisit, so it will never reach 1.
        Set<Integer> seen = new HashSet<>();
        while (n != 1 && seen.add(n)) {
            // Sum of the squares of the digits, one digit per iteration.
            int total = 0;
            while (n != 0) {
                int digit = n % 10;
                total += digit * digit;
                n /= 10;
            }
            n = total;
        }
        return n == 1;
    }
}
