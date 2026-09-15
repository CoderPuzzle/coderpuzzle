class Solution {
  public:
    long long minimumCost(string s, string t, int flipCost, int swapCost, int crossCost) {
        // Mismatch classes decide everything: a01 counts columns needing 0->1,
        // a10 the mirror image. Opposite kinds cancel pairwise with one swap
        // (or two flips); leftovers of a single kind pair up via cross-swap +
        // swap (or two flips); a lone leftover takes one flip.
        long long a01 = 0;
        long long a10 = 0;
        for (int i = 0; i < (int)s.size(); i++) {
            if (s[i] == '0' && t[i] == '1') {
                a01++;
            } else if (s[i] == '1' && t[i] == '0') {
                a10++;
            }
        }
        // Opposite-kind mismatches fix each other: reorder one string so they
        // meet, paying one swap; two flips is the alternative.
        long long pairs = min(a01, a10);
        long long cost = pairs * min((long long)swapCost, 2LL * flipCost);
        long long same = llabs(a01 - a10);
        // Same-kind mismatches: a cross-swap turns one into the other kind,
        // then a swap pairs it — or just flip both.
        cost += (same / 2) * min((long long)crossCost + swapCost, 2LL * flipCost);
        if (same % 2 == 1) {
            cost += flipCost;
        }
        return cost;
    }
};
