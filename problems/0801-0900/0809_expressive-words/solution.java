class Solution {

    public int expressiveWords(String s, String[] words) {
        // Run-length encode s once: its letter spine is what every
        // stretchy word must reproduce, group by group.
        char[] cs = s.toCharArray();
        int n = cs.length;
        char[] sLetters = new char[n];
        int[] sCounts = new int[n];
        int groups = 0;
        int i = 0;
        while (i < n) {
            int j = i;
            while (j < n && cs[j] == cs[i]) {
                j++;
            }
            sLetters[groups] = cs[i];
            sCounts[groups] = j - i;
            groups++;
            i = j;
        }
        int count = 0;
        for (String w : words) {
            // Walk w's own groups against s's: same letters, same group
            // count, and per group either equal counts or an s-side
            // count of 3 or more strictly above the word's.
            char[] cw = w.toCharArray();
            int m = cw.length;
            int gi = 0;
            int k = 0;
            boolean ok = true;
            while (k < m) {
                int j = k;
                while (j < m && cw[j] == cw[k]) {
                    j++;
                }
                if (gi == groups || sLetters[gi] != cw[k]) {
                    ok = false;
                    break;
                }
                int sCount = sCounts[gi];
                int wCount = j - k;
                if (sCount != wCount && !(sCount >= 3 && sCount > wCount)) {
                    ok = false;
                    break;
                }
                gi++;
                k = j;
            }
            // The walk must end in lockstep with s's spine.
            if (ok && gi == groups) {
                count++;
            }
        }
        return count;
    }
}
