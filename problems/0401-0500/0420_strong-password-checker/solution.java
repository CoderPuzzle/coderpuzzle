import java.util.ArrayList;
import java.util.List;

class Solution {

    public int strongPasswordChecker(String password) {
        int n = password.length();
        boolean hasLower = false,
            hasUpper = false,
            hasDigit = false;
        for (int i = 0; i < n; i++) {
            char c = password.charAt(i);
            hasLower |= c >= 'a' && c <= 'z';
            hasUpper |= c >= 'A' && c <= 'Z';
            hasDigit |= c >= '0' && c <= '9';
        }
        // Each missing class needs one dedicated step to introduce.
        int missing = 3 - ((hasLower ? 1 : 0) + (hasUpper ? 1 : 0) + (hasDigit ? 1 : 0));
        // Every maximal run of length >= 3, e.g. "aaabbb" -> [3, 3].
        List<Integer> runs = new ArrayList<>();
        int i = 0;
        while (i < n) {
            int j = i;
            while (j < n && password.charAt(j) == password.charAt(i)) {
                j++;
            }
            if (j - i >= 3) {
                runs.add(j - i);
            }
            i = j;
        }
        // Too short: the inserts that reach length 6 can also break the one
        // possible run and carry the missing classes.
        if (n < 6) {
            return Math.max(6 - n, missing);
        }
        // A replace fixes a run slot and can double as a class fix, so the
        // mid regime is a max, not a sum.
        int replace = 0;
        for (int length : runs) {
            replace += length / 3;
        }
        if (n <= 20) {
            return Math.max(missing, replace);
        }
        // Too long: n - 20 deletions are unavoidable. A deletion retires a
        // replace only when it pushes a run below a multiple of 3, so the
        // budget goes to runs sitting on a multiple first (1 deletion),
        // then remainder 1 (2 deletions), then remainder 2 (3 deletions).
        int delete = n - 20;
        for (int remainder = 0; remainder < 3; remainder++) {
            for (int length : runs) {
                if (length % 3 != remainder) {
                    continue;
                }
                int cost = remainder + 1;
                if (delete >= cost) {
                    delete -= cost;
                    replace -= 1;
                }
            }
        }
        replace = Math.max(replace - delete / 3, 0);
        return n - 20 + Math.max(missing, replace);
    }
}
