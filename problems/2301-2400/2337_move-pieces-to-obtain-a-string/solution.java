import java.util.ArrayList;

class Solution {

    public boolean canChange(String start, String target) {
        int n = start.length();
        // pieces cannot pass through each other, so their relative order is
        // invariant: the k-th non-blank of start must match the k-th of target
        ArrayList<int[]> s = new ArrayList<>();
        ArrayList<int[]> t = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            if (start.charAt(i) != '_') s.add(new int[] { i, start.charAt(i) });
            if (target.charAt(i) != '_') t.add(new int[] { i, target.charAt(i) });
        }
        // unequal piece counts can never be matched one-to-one
        if (s.size() != t.size()) return false;
        for (int p = 0; p < s.size(); p++) {
            int i = s.get(p)[0];
            char ci = (char) s.get(p)[1];
            int j = t.get(p)[0];
            char cj = (char) t.get(p)[1];
            // equal counts but a different L/R sequence cannot align
            if (ci != cj) return false;
            // L slides only left: it must not need to move right (i >= j);
            // R slides only right: i <= j — and these checks are also
            // sufficient, so no moves ever need simulating
            if (ci == 'L' && i < j) return false;
            if (ci == 'R' && i > j) return false;
        }
        return true;
    }
}
