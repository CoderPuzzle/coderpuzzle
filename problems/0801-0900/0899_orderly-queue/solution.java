import java.util.Arrays;

class Solution {

    public String orderlyQueue(String s, int k) {
        // A move lifts one of the first k letters to the end. With k = 1
        // the only liftable letter is the very first, so every move is a
        // plain rotation and the answer is the smallest rotation of s:
        // try each cut. With k >= 2 one of the two front letters is never
        // the smallest still waiting, so a non-smallest one can always be
        // parked at the back while the smallest walks forward — every
        // ordering becomes reachable and the answer is the sorted string.
        if (k >= 2) {
            char[] letters = s.toCharArray();
            Arrays.sort(letters);
            return new String(letters);
        }
        int n = s.length();
        String best = s;
        for (int i = 1; i < n; i++) {
            String candidate = s.substring(i) + s.substring(0, i);
            if (candidate.compareTo(best) < 0) {
                best = candidate;
            }
        }
        return best;
    }
}
