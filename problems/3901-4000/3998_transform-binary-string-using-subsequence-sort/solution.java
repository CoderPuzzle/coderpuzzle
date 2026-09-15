import java.util.*;

class Solution {

    public boolean[] transformStr(String s, String[] qs) {
        int total = 0;
        for (char c : s.toCharArray()) if (c == '1') total++;
        boolean[] out = new boolean[qs.length];
        for (int z = 0; z < qs.length; z++) {
            String q = qs[z];
            int fixed = 0,
                wild = 0;
            for (char c : q.toCharArray()) {
                if (c == '1') fixed++;
                if (c == '?') wild++;
            }
            int need = total - fixed;
            if (need < 0 || need > wild) continue;
            boolean[] one = new boolean[q.length()];
            for (int i = q.length() - 1; i >= 0 && need > 0; i--) if (q.charAt(i) == '?') {
                one[i] = true;
                need--;
            }
            int a = 0,
                b = 0;
            out[z] = true;
            for (int i = 0; i < q.length(); i++) {
                if (s.charAt(i) == '1') a++;
                if (q.charAt(i) == '1' || one[i]) b++;
                if (b > a) out[z] = false;
            }
        }
        return out;
    }
}
