class Solution {

    public int[] longestCommonPrefix(String[] words) {
        // Removing words[i] keeps every adjacent pair except (i-1, i) and
        // (i, i+1), and adds the single new pair (i-1, i+1). With
        // adj[j] = lcp(words[j], words[j+1]), the best surviving old pair
        // is the max of adj[0..i-2] and adj[i+1..n-2] — pre/suffix maxima
        // answer that in O(1) — so each answer is the max of the left
        // max, the right max, and that one new LCP.
        int n = words.length;
        int[] adj = new int[Math.max(n - 1, 0)];
        for (int i = 0; i + 1 < n; ++i) {
            int limit = Math.min(words[i].length(), words[i + 1].length());
            int j = 0;
            while (j < limit && words[i].charAt(j) == words[i + 1].charAt(j)) {
                ++j;
            }
            adj[i] = j;
        }

        int[] pre = new int[n]; // max(adj[0..i-2]) — best pair fully left of i
        for (int i = 2; i < n; ++i) pre[i] = Math.max(pre[i - 1], adj[i - 2]);
        int[] suf = new int[n]; // max(adj[i+1..n-2]) — best pair fully right of i
        for (int i = n - 3; i >= 0; --i) suf[i] = Math.max(suf[i + 1], adj[i + 1]);

        int[] answer = new int[n];
        for (int i = 0; i < n; ++i) {
            int best = Math.max(pre[i], suf[i]);
            if (i > 0 && i < n - 1) {
                int limit = Math.min(words[i - 1].length(), words[i + 1].length());
                int j = 0;
                while (j < limit && words[i - 1].charAt(j) == words[i + 1].charAt(j)) {
                    ++j;
                }
                best = Math.max(best, j);
            }
            answer[i] = best;
        }
        return answer;
    }
}
