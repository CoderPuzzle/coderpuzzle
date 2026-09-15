class Solution {

    public int[] longestRepeating(String s, String queryCharacters, int[] queryIndices) {
        int n = s.length();
        if (n == 0) return new int[0];

        // per-node summary: uniform prefix/suffix runs, best run, boundary chars
        int[] pref = new int[4 * n];
        int[] suf = new int[4 * n];
        int[] best = new int[4 * n];
        int[] segLen = new int[4 * n];
        char[] leftChar = new char[4 * n];
        char[] rightChar = new char[4 * n];
        char[] chars = s.toCharArray();

        build(chars, pref, suf, best, segLen, leftChar, rightChar, 1, 0, n - 1);
        int[] result = new int[queryIndices.length];
        for (int i = 0; i < queryIndices.length; i++) {
            update(
                chars,
                pref,
                suf,
                best,
                segLen,
                leftChar,
                rightChar,
                1,
                0,
                n - 1,
                queryIndices[i],
                queryCharacters.charAt(i)
            );
            // the root's best is the answer after each point update
            result[i] = best[1];
        }
        return result;
    }

    private void pull(int[] pref, int[] suf, int[] best, int[] segLen, char[] leftChar, char[] rightChar, int node) {
        int l = 2 * node,
            r = 2 * node + 1;
        segLen[node] = segLen[l] + segLen[r];
        leftChar[node] = leftChar[l];
        rightChar[node] = rightChar[r];
        // prefix spans into the right child only if the left child is one whole
        // run and the boundary characters agree
        if (pref[l] == segLen[l] && leftChar[l] == leftChar[r]) {
            pref[node] = pref[l] + pref[r];
        } else {
            pref[node] = pref[l];
        }
        if (suf[r] == segLen[r] && rightChar[r] == rightChar[l]) {
            suf[node] = suf[r] + suf[l];
        } else {
            suf[node] = suf[r];
        }
        // a run may straddle the child boundary when the boundary chars agree
        int joined = rightChar[l] == leftChar[r] ? suf[l] + pref[r] : 0;
        best[node] = Math.max(best[l], Math.max(best[r], joined));
    }

    private void build(
        char[] chars,
        int[] pref,
        int[] suf,
        int[] best,
        int[] segLen,
        char[] leftChar,
        char[] rightChar,
        int node,
        int lo,
        int hi
    ) {
        if (lo == hi) {
            // a leaf is the trivial summary: a single run of length 1
            pref[node] = suf[node] = best[node] = 1;
            segLen[node] = 1;
            leftChar[node] = rightChar[node] = chars[lo];
            return;
        }
        int mid = (lo + hi) >>> 1;
        build(chars, pref, suf, best, segLen, leftChar, rightChar, 2 * node, lo, mid);
        build(chars, pref, suf, best, segLen, leftChar, rightChar, 2 * node + 1, mid + 1, hi);
        pull(pref, suf, best, segLen, leftChar, rightChar, node);
    }

    private void update(
        char[] chars,
        int[] pref,
        int[] suf,
        int[] best,
        int[] segLen,
        char[] leftChar,
        char[] rightChar,
        int node,
        int lo,
        int hi,
        int pos,
        char ch
    ) {
        if (lo == hi) {
            chars[pos] = ch;
            leftChar[node] = rightChar[node] = ch;
            return;
        }
        int mid = (lo + hi) >>> 1;
        if (pos <= mid) {
            update(chars, pref, suf, best, segLen, leftChar, rightChar, 2 * node, lo, mid, pos, ch);
        } else {
            update(chars, pref, suf, best, segLen, leftChar, rightChar, 2 * node + 1, mid + 1, hi, pos, ch);
        }
        // recompute the O(log n) nodes on the path back to the root
        pull(pref, suf, best, segLen, leftChar, rightChar, node);
    }
}
