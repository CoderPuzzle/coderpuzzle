import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[] movesToStamp(String stamp, String target) {
        // Work backwards from target, where stamping forwards becomes erasing:
        // a window is erasable once every character in it either equals its
        // stamp counterpart or is already '?', because the last stamp to
        // cover a position always leaves the stamp's own letter there. Each
        // round takes the leftmost erasable window that still contains a
        // letter — erasing it can never block the remaining windows, since
        // turning letters into '?' only widens what matches — and blanks it.
        // A round that finds nothing while letters remain proves the target
        // unreachable; reversing the recorded indices yields the stamping
        // order.
        int m = stamp.length();
        int n = target.length();
        char[] s = target.toCharArray();
        int remaining = n;
        List<Integer> recorded = new ArrayList<>();
        while (remaining > 0) {
            int found = -1;
            for (int i = 0; i + m <= n; ++i) {
                boolean ok = true;
                boolean progress = false;
                for (int j = 0; j < m; ++j) {
                    char c = s[i + j];
                    if (c == '?') {
                        continue;
                    }
                    if (c != stamp.charAt(j)) {
                        ok = false;
                        break;
                    }
                    progress = true;
                }
                if (ok && progress) {
                    found = i;
                    break;
                }
            }
            if (found < 0) {
                return new int[0];
            }
            for (int j = 0; j < m; ++j) {
                if (s[found + j] != '?') {
                    s[found + j] = '?';
                    --remaining;
                }
            }
            recorded.add(found);
        }
        int[] answer = new int[recorded.size()];
        for (int k = 0; k < answer.length; ++k) {
            answer[k] = recorded.get(answer.length - 1 - k);
        }
        return answer;
    }
}
