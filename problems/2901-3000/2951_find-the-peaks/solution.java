class Solution {

    public int[] findPeaks(int[] mountain) {
        int n = mountain.length;
        int count = 0;
        for (int i = 1; i < n - 1; i++) {
            if (mountain[i] > mountain[i - 1] && mountain[i] > mountain[i + 1]) {
                count++;
            }
        }
        int[] peaks = new int[count];
        int idx = 0;
        for (int i = 1; i < n - 1; i++) {
            if (mountain[i] > mountain[i - 1] && mountain[i] > mountain[i + 1]) {
                peaks[idx++] = i;
            }
        }
        return peaks;
    }
}
