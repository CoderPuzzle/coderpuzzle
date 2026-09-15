class Solution {

    public int[] findArray(int[] pref) {
        // arr[i] = pref[i] ^ pref[i-1] for every i (arr[0] = pref[0]), and
        // xor is its own inverse, so the original array falls out of one
        // linear difference pass. Written into a fresh output so the
        // caller's pref is never disturbed.
        int[] arr = new int[pref.length];
        arr[0] = pref[0];
        for (int i = 1; i < pref.length; ++i) {
            arr[i] = pref[i] ^ pref[i - 1];
        }
        return arr;
    }
}
