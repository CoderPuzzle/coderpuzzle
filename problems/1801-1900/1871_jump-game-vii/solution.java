class Solution {

    // Every reachable i contributes the interval [i+minJump, i+maxJump],
    // so "some source reaches j" is a range-count query; a rolling
    // prefix sum over reach[] answers it in O(1) per position.
    public boolean canReach(String s, int minJump, int maxJump) {
        int n = s.length();
        int[] pre = new int[n + 1];
        pre[1] = 1; // index 0 is reachable by definition
        for (int i = 1; i < n; i++) {
            boolean ok = false;
            if (s.charAt(i) == '0' && i >= minJump) {
                int hi = i - minJump;
                int lo = Math.max(i - maxJump, 0);
                ok = pre[hi + 1] - pre[lo] > 0;
            }
            pre[i + 1] = pre[i] + (ok ? 1 : 0);
        }
        return pre[n] > pre[n - 1];
    }
}
