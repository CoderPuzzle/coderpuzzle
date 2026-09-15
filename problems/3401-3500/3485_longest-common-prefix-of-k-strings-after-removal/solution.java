class Solution {

    public int[] longestCommonPrefix(String[] words, int k) {
        int n = words.length;
        // With one word gone there are fewer than k words, so no prefix survives.
        if (n - 1 < k) {
            return new int[n];
        }

        long total = 0;
        int maxLen = 0;
        for (String w : words) {
            total += w.length();
            maxLen = Math.max(maxLen, w.length());
        }
        int cap = (int) total + 1;
        int[] children = new int[cap * 26];
        java.util.Arrays.fill(children, -1);
        int[] cnt = new int[cap];
        int[] depth = new int[cap];
        int nodes = 1;
        // A trie node at depth d is a prefix of length d shared by cnt words.
        for (String w : words) {
            int cur = 0;
            cnt[0]++;
            for (int i = 0; i < w.length(); i++) {
                int idx = cur * 26 + (w.charAt(i) - 'a');
                if (children[idx] == -1) {
                    children[idx] = nodes;
                    depth[nodes] = depth[cur] + 1;
                    nodes++;
                }
                cur = children[idx];
                cnt[cur]++;
            }
        }

        int[] top1 = new int[maxLen + 1];
        int[] top2 = new int[maxLen + 1];
        java.util.Arrays.fill(top1, -1);
        java.util.Arrays.fill(top2, -1);
        // Keep the two distinct nodes per depth with cnt >= k: if the removed
        // word's path covers the best one, the second is still off that path.
        for (int node = 0; node < nodes; node++) {
            if (cnt[node] >= k) {
                int d = depth[node];
                if (top1[d] == -1) {
                    top1[d] = node;
                } else if (top2[d] == -1) {
                    top2[d] = node;
                }
            }
        }
        int nd = 0;
        for (int d = maxLen; d >= 0; d--) {
            if (top1[d] != -1) nd++;
        }
        int[] depths = new int[nd];
        int p = 0;
        for (int d = maxLen; d >= 0; d--) {
            if (top1[d] != -1) depths[p++] = d;
        }

        int[] stamp = new int[nodes];
        int[] ans = new int[n];
        for (int wi = 0; wi < n; wi++) {
            String w = words[wi];
            int tag = wi + 1;
            // A unique timestamp marks this word's trie path; old marks never match.
            stamp[0] = tag;
            int cur = 0;
            int big = 0;
            // On-path node survives the removal only with cnt >= k + 1.
            for (int i = 0; i < w.length(); i++) {
                cur = children[cur * 26 + (w.charAt(i) - 'a')];
                stamp[cur] = tag;
                if (cnt[cur] >= k + 1 && depth[cur] > big) {
                    big = depth[cur];
                }
            }
            int fb = 0;
            // Deepest off-path depth: top2 exists there, or top1 is off the path.
            for (int d : depths) {
                if (top2[d] != -1) {
                    fb = d;
                    break;
                }
                if (stamp[top1[d]] != tag) {
                    fb = d;
                    break;
                }
            }
            ans[wi] = Math.max(big, fb);
        }
        return ans;
    }
}
