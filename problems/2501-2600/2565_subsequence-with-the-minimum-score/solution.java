class Solution {

    public int minimumScore(String s, String t) {
        // Removing scattered characters only charges their two extreme
        // indices, so any optimal selection widens to one contiguous
        // block [i, j): padding it never raises the score, and dropping
        // more kept characters can only help the subsequence check.
        // Greedy walks pin how far each flank reaches into s. pre[i] is
        // the earliest end in s of a match of t[:i] (-1 marks the empty
        // prefix) and stays finite up to L; suf[j] is the latest start
        // of a backward match of t[j:] and stays finite from firstSuf.
        // The block works iff pre[i] < suf[j]; pre rises with i and the
        // smallest feasible j rises with it, so one forward pointer
        // prices every split. Edge windows (drop whole tail/head/all)
        // are the candidates j = m and i = 0 and fall out of the same
        // sentinels.
        int n = s.length(),
            m = t.length();
        int[] pre = new int[m + 1];
        for (int i = 0; i <= m; ++i) pre[i] = -1;
        int j = 0,
            longestPre = 0;
        for (int i = 1; i <= m; ++i) {
            while (j < n && s.charAt(j) != t.charAt(i - 1)) ++j;
            if (j == n) break;
            pre[i] = j++;
            longestPre = i;
        }
        if (longestPre == m) return 0;
        int[] suf = new int[m + 1];
        j = n - 1;
        int firstSuf = m;
        for (int k = m - 1; k >= 0; --k) {
            while (j >= 0 && s.charAt(j) != t.charAt(k)) --j;
            if (j < 0) break;
            suf[k] = j--;
            firstSuf = k;
        }
        int ans = m - longestPre;
        if (firstSuf < ans) ans = firstSuf;
        int p = 1;
        for (int i = 0; i <= longestPre; ++i) {
            if (p < i + 1) p = i + 1;
            if (p < firstSuf) p = firstSuf;
            while (p < m && suf[p] <= pre[i]) ++p;
            if (p < m && p - i < ans) ans = p - i;
        }
        return ans;
    }
}
