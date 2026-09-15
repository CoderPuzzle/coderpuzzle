class Solution {

    public int minOperations(String initial, String target) {
        // Characters that survive form a contiguous window of initial and a
        // contiguous window of target, i.e. a common substring; every other
        // character costs exactly one operation, so the answer is
        // m + n - 2 * (longest common substring).
        int best = 0;
        char[] t = target.toCharArray();
        int[] prev = new int[t.length + 1];
        for (char a : initial.toCharArray()) {
            int[] cur = new int[t.length + 1];
            for (int j = 0; j < t.length; j++) {
                if (a == t[j]) {
                    cur[j + 1] = prev[j] + 1;
                    if (cur[j + 1] > best) best = cur[j + 1];
                }
            }
            prev = cur;
        }
        return initial.length() + target.length() - 2 * best;
    }
}
