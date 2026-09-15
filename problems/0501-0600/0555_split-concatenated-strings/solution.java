class Solution {

    public String splitLoopedString(String[] strs) {
        // Every string except the breakpoint carrier stands at max(s, s
        // reversed) - fixed slot lengths make per-string maxima optimal.
        // The breakpoint string itself is tried in BOTH orientations at
        // every cut, its suffix leading the regular string and its prefix
        // closing it, wrapped around the others' standing forms in loop
        // order.
        int n = strs.length;
        String[] best = new String[n];
        for (int i = 0; i < n; ++i) {
            best[i] = maxOrientation(strs[i]);
        }
        String ans = "";
        for (int i = 0; i < n; ++i) {
            StringBuilder rest = new StringBuilder();
            for (int j = 1; j < n; ++j) {
                rest.append(best[(i + j) % n]);
            }
            String forward = strs[i];
            String backward = new StringBuilder(forward).reverse().toString();
            for (int o = 0; o < 2; ++o) {
                String t = o == 0 ? forward : backward;
                for (int k = 0; k < t.length(); ++k) {
                    String cand = t.substring(k) + rest + t.substring(0, k);
                    if (cand.compareTo(ans) > 0) {
                        ans = cand;
                    }
                }
            }
        }
        return ans;
    }

    private static String maxOrientation(String s) {
        String rev = new StringBuilder(s).reverse().toString();
        return s.compareTo(rev) >= 0 ? s : rev;
    }
}
