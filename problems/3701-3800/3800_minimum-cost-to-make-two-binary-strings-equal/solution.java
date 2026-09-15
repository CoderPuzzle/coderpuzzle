class Solution {

    public long minimumCost(String s, String t, int flipCost, int swapCost, int crossCost) {
        // Mismatch classes decide everything: a01 counts columns needing 0->1,
        // a10 the mirror image. Opposite kinds cancel pairwise with one swap
        // (or two flips); leftovers of a single kind pair up via cross-swap +
        // swap (or two flips); a lone leftover takes one flip.
        long a01 = 0;
        long a10 = 0;
        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) == '0' && t.charAt(i) == '1') {
                a01++;
            } else if (s.charAt(i) == '1' && t.charAt(i) == '0') {
                a10++;
            }
        }
        // Opposite-kind mismatches fix each other: reorder one string so they
        // meet, paying one swap; two flips is the alternative.
        long pairs = Math.min(a01, a10);
        long cost = pairs * Math.min(swapCost, 2L * flipCost);
        long same = Math.abs(a01 - a10);
        // Same-kind mismatches: a cross-swap turns one into the other kind,
        // then a swap pairs it — or just flip both.
        cost += (same / 2) * Math.min((long) crossCost + swapCost, 2L * flipCost);
        if (same % 2 == 1) {
            cost += flipCost;
        }
        return cost;
    }
}
