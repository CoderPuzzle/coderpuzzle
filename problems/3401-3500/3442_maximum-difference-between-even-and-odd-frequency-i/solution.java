class Solution {

    public int maxDifference(String s) {
        // To maximize freq(a1) - freq(a2), take the largest odd frequency
        // and the smallest even one; one counting pass decides both.
        int[] freq = new int[26];
        for (int i = 0; i < s.length(); ++i) ++freq[s.charAt(i) - 'a'];
        int odd = -1,
            even = 101;
        for (int f : freq) {
            if (f == 0) continue;
            if ((f & 1) == 1) odd = Math.max(odd, f);
            else even = Math.min(even, f);
        }
        return odd - even;
    }
}
