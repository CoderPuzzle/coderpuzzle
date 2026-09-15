import java.util.ArrayList;
import java.util.List;

class Solution {

    public int shortestMatchingSubstring(String s, String p) {
        String[] parts = p.split("\\*", -1);
        String a = parts[0],
            b = parts[1],
            c = parts[2];
        List<Integer> occA = a.isEmpty() ? new ArrayList<>() : findAll(s, a);
        List<Integer> occB = b.isEmpty() ? new ArrayList<>() : findAll(s, b);
        List<Integer> occC = c.isEmpty() ? new ArrayList<>() : findAll(s, c);

        List<int[]> segs = new ArrayList<>(); // {length, listIndex}
        List<List<Integer>> occs = new ArrayList<>();
        if (!a.isEmpty()) {
            segs.add(new int[] { a.length(), occs.size() });
            occs.add(occA);
        }
        if (!b.isEmpty()) {
            segs.add(new int[] { b.length(), occs.size() });
            occs.add(occB);
        }
        if (!c.isEmpty()) {
            segs.add(new int[] { c.length(), occs.size() });
            occs.add(occC);
        }

        if (segs.isEmpty()) return 0;
        if (segs.size() == 1) {
            return occs.get(segs.get(0)[1]).isEmpty() ? -1 : segs.get(0)[0];
        }
        if (segs.size() == 2) {
            int l1 = segs.get(0)[0];
            List<Integer> occ1 = occs.get(segs.get(0)[1]);
            int l2 = segs.get(1)[0];
            List<Integer> occ2 = occs.get(segs.get(1)[1]);
            int best = -1;
            for (int j : occ2) {
                int idx = bisectRight(occ1, j - l1) - 1;
                if (idx >= 0) {
                    int cand = j + l2 - occ1.get(idx);
                    if (best == -1 || cand < best) best = cand;
                }
            }
            return best;
        }
        // three non-empty segments
        int l1 = segs.get(0)[0];
        List<Integer> occ1 = occs.get(segs.get(0)[1]);
        int l2 = segs.get(1)[0];
        List<Integer> occ2 = occs.get(segs.get(1)[1]);
        int l3 = segs.get(2)[0];
        List<Integer> occ3 = occs.get(segs.get(2)[1]);
        int[] bestIForJ = new int[occ2.size()];
        for (int t = 0; t < occ2.size(); t++) {
            int j = occ2.get(t);
            int idx = bisectRight(occ1, j - l1) - 1;
            bestIForJ[t] = idx >= 0 ? occ1.get(idx) : -1;
        }
        int best = -1;
        for (int k : occ3) {
            int jIdx = bisectRight(occ2, k - l2) - 1;
            if (jIdx >= 0 && bestIForJ[jIdx] != -1) {
                int cand = k + l3 - bestIForJ[jIdx];
                if (best == -1 || cand < best) best = cand;
            }
        }
        return best;
    }

    private List<Integer> findAll(String s, String pat) {
        List<Integer> result = new ArrayList<>();
        int start = 0;
        while (true) {
            int idx = s.indexOf(pat, start);
            if (idx == -1) break;
            result.add(idx);
            start = idx + 1;
        }
        return result;
    }

    // first index with arr[i] > target, else arr.size()
    private int bisectRight(List<Integer> arr, int target) {
        int lo = 0,
            hi = arr.size();
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (arr.get(mid) <= target) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }
}
