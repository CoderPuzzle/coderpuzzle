class Solution {

    public String modifyString(String s) {
        // Only 3 candidate letters and at most 2 neighbors to avoid, so one
        // of 'a', 'b', 'c' (tried in that fixed order) always works.
        char[] chars = s.toCharArray();
        int n = chars.length;
        for (int i = 0; i < n; ++i) {
            if (chars[i] != '?') {
                continue;
            }
            for (char candidate = 'a'; candidate <= 'c'; ++candidate) {
                boolean leftOk = i == 0 || chars[i - 1] != candidate;
                boolean rightOk = i == n - 1 || chars[i + 1] != candidate;
                if (leftOk && rightOk) {
                    chars[i] = candidate;
                    break;
                }
            }
        }
        return new String(chars);
    }
}
