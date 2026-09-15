class Solution {

    public int[] minDeletions(String s, int[][] queries) {
        // eq[i] = 1 iff i >= 1 and s[i] == s[i - 1]. Deleting one
        // character per equal adjacent pair is optimal, so the type-2
        // answer over s[l..r] is exactly sum(eq[l+1..r]). A Fenwick tree
        // over eq answers each query in O(log n), and flipping s[j] only
        // ever changes eq[j] and eq[j + 1], because every other adjacency
        // is untouched.
        int n = s.length();
        int[] cur = new int[n];
        int[] bits = new int[n];
        for (int i = 1; i < n; i++) {
            cur[i] = s.charAt(i) == s.charAt(i - 1) ? 1 : 0;
            if (cur[i] == 1) {
                add(bits, n, i, 1);
            }
        }
        char[] chars = s.toCharArray();
        int typeTwo = 0;
        for (int[] query : queries) {
            if (query[0] == 2) {
                typeTwo++;
            }
        }
        int[] answer = new int[typeTwo];
        int k = 0;
        for (int[] query : queries) {
            if (query[0] == 1) {
                int j = query[1];
                chars[j] = chars[j] == 'A' ? 'B' : 'A';
                if (j + 1 < n) {
                    setEq(cur, bits, n, j + 1, chars[j + 1] == chars[j] ? 1 : 0);
                }
                setEq(cur, bits, n, j, j >= 1 && chars[j] == chars[j - 1] ? 1 : 0);
            } else {
                answer[k++] = pref(bits, query[2]) - pref(bits, query[1]);
            }
        }
        return answer;
    }

    private static void add(int[] bits, int n, int i, int delta) {
        for (; i < n; i += i & -i) {
            bits[i] += delta;
        }
    }

    private static int pref(int[] bits, int i) {
        int total = 0;
        for (; i > 0; i -= i & -i) {
            total += bits[i];
        }
        return total;
    }

    private static void setEq(int[] cur, int[] bits, int n, int i, int value) {
        if (i >= 1 && i < n && cur[i] != value) {
            add(bits, n, i, value - cur[i]);
            cur[i] = value;
        }
    }
}
