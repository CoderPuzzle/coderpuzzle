import java.util.ArrayList;
import java.util.List;

class Solution {

    public String[] ambiguousCoordinates(String s) {
        String t = s.substring(1, s.length() - 1);
        List<String> result = new ArrayList<>();
        for (int i = 1; i < t.length(); ++i) {
            List<String> lefts = forms(t.substring(0, i));
            if (lefts.isEmpty()) {
                continue;
            }
            List<String> rights = forms(t.substring(i));
            if (rights.isEmpty()) {
                continue;
            }
            for (String a : lefts) {
                for (String b : rights) {
                    result.add("(" + a + ", " + b + ")");
                }
            }
        }
        return result.toArray(new String[0]);
    }

    // Every valid rendering of the digit run t, in the statement's pinned
    // order: decimal forms first, point moving right, then the plain integer
    // last.
    private List<String> forms(String t) {
        List<String> out = new ArrayList<>();
        for (int k = 1; k < t.length(); ++k) {
            String whole = t.substring(0, k);
            String frac = t.substring(k);
            // The whole part may not open with '0' unless it is exactly "0",
            // and the fractional part may not end in '0'.
            if (whole.length() > 1 && whole.charAt(0) == '0') {
                continue;
            }
            if (frac.charAt(frac.length() - 1) == '0') {
                continue;
            }
            out.add(whole + "." + frac);
        }
        if (t.length() == 1 || t.charAt(0) != '0') {
            out.add(t);
        }
        return out;
    }
}
