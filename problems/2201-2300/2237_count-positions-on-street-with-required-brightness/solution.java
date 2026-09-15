class Solution {

    public int meetRequirement(int n, int[][] lights, int[] requirement) {
        int[] delta = new int[n + 1];
        for (int[] light : lights) {
            int position = light[0],
                range = light[1];
            delta[Math.max(0, position - range)]++;
            delta[Math.min(n, position + range + 1)]--;
        }
        int brightness = 0,
            count = 0;
        for (int i = 0; i < n; i++) {
            brightness += delta[i];
            if (brightness >= requirement[i]) {
                count++;
            }
        }
        return count;
    }
}
