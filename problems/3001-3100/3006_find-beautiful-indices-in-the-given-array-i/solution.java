class Solution {

    public int[] beautifulIndices(String s, String a, String b, int k) {
        // An index is beautiful exactly when it is an occurrence of a whose
        // window [i - k, i + k] contains an occurrence of b. Collect both
        // occurrence lists once — each scan advances one character at a time
        // so overlapping occurrences are not skipped — then for each
        // a-occurrence binary-search the sorted b-list for the leftmost
        // entry >= i - k; it qualifies iff that entry also satisfies
        // <= i + k. Ascending a-occurrences keep the answer ascending.
        int[] whereB = collect(s, b);
        int[] whereA = collect(s, a);
        int[] answer = new int[whereA.length];
        int count = 0;
        for (int idx = 0; idx < whereA.length; ++idx) {
            int i = whereA[idx];
            int low = 0;
            int high = whereB.length;
            while (low < high) {
                int mid = (low + high) >>> 1;
                if (whereB[mid] < i - k) {
                    low = mid + 1;
                } else {
                    high = mid;
                }
            }
            if (low < whereB.length && whereB[low] <= i + k) {
                answer[count++] = i;
            }
        }
        return java.util.Arrays.copyOf(answer, count);
    }

    private int[] collect(String s, String pattern) {
        int[] found = new int[s.length()];
        int count = 0;
        for (int start = 0; start + pattern.length() <= s.length(); ++start) {
            if (s.startsWith(pattern, start)) {
                found[count++] = start;
            }
        }
        return java.util.Arrays.copyOf(found, count);
    }
}
