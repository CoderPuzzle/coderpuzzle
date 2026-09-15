class Solution {

    public int minFlips(String s) {
        int n = s.length();
        String t = s + s;
        // pre[i] = mismatches of t[0:i] against the absolute pattern 0,1,0,1,...
        int[] pre = new int[t.length() + 1];
        for (int i = 0; i < t.length(); i++) {
            char want = (i & 1) == 1 ? '1' : '0';
            pre[i + 1] = pre[i] + (t.charAt(i) != want ? 1 : 0);
        }
        int best = n;
        for (int k = 0; k < n; k++) {
            int absMismatch = pre[k + n] - pre[k];
            int costA = (k & 1) == 1 ? n - absMismatch : absMismatch;
            best = Math.min(best, Math.min(costA, n - costA));
        }
        return best;
    }
}
