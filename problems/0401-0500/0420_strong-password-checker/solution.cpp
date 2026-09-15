class Solution {
  public:
    int strongPasswordChecker(string password) {
        int n = (int)password.size();
        bool hasLower = false, hasUpper = false, hasDigit = false;
        for (char c : password) {
            hasLower = hasLower || (c >= 'a' && c <= 'z');
            hasUpper = hasUpper || (c >= 'A' && c <= 'Z');
            hasDigit = hasDigit || (c >= '0' && c <= '9');
        }
        // Each missing class needs one dedicated step to introduce.
        int missing = 3 - (hasLower + hasUpper + hasDigit);
        // Every maximal run of length >= 3, e.g. "aaabbb" -> {3, 3}.
        vector<int> runs;
        int i = 0;
        while (i < n) {
            int j = i;
            while (j < n && password[j] == password[i]) {
                j++;
            }
            if (j - i >= 3) {
                runs.push_back(j - i);
            }
            i = j;
        }
        // Too short: the inserts that reach length 6 can also break the one
        // possible run and carry the missing classes.
        if (n < 6) {
            return max(6 - n, missing);
        }
        // A replace fixes a run slot and can double as a class fix, so the
        // mid regime is a max, not a sum.
        int replace = 0;
        for (int length : runs) {
            replace += length / 3;
        }
        if (n <= 20) {
            return max(missing, replace);
        }
        // Too long: n - 20 deletions are unavoidable. A deletion retires a
        // replace only when it pushes a run below a multiple of 3, so the
        // budget goes to runs sitting on a multiple first (1 deletion),
        // then remainder 1 (2 deletions), then remainder 2 (3 deletions).
        int toDelete = n - 20;
        for (int remainder = 0; remainder < 3; remainder++) {
            for (int length : runs) {
                if (length % 3 != remainder) {
                    continue;
                }
                int cost = remainder + 1;
                if (toDelete >= cost) {
                    toDelete -= cost;
                    replace -= 1;
                }
            }
        }
        replace = max(replace - toDelete / 3, 0);
        return (n - 20) + max(missing, replace);
    }
};
