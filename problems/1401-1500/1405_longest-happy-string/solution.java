class Solution {

    public String longestDiverseString(int a, int b, int c) {
        int[] cnt = { a, b, c };
        char[] letters = { 'a', 'b', 'c' };
        StringBuilder result = new StringBuilder();
        while (true) {
            // most plentiful letter first: burning rare letters while a common
            // one dominates would strand it in a forced aaa/bbb/ccc run
            Integer[] idx = { 0, 1, 2 };
            java.util.Arrays.sort(idx, (x, y) -> {
                if (cnt[x] != cnt[y]) {
                    return Integer.compare(cnt[y], cnt[x]);
                }
                return Character.compare(letters[x], letters[y]);
            });
            int pick = idx[0];
            if (cnt[pick] == 0) {
                break;
            }
            int len = result.length();
            if (len >= 2 && result.charAt(len - 1) == letters[pick] && result.charAt(len - 2) == letters[pick]) {
                // head letter just placed twice -> switch to the runner-up; if
                // the runner-up is out of budget, only one letter remains and it
                // is already doubled — cap here rather than emit a triple
                pick = idx[1];
                if (cnt[pick] == 0) {
                    break;
                }
            }
            result.append(letters[pick]);
            cnt[pick]--;
        }
        return result.toString();
    }
}
