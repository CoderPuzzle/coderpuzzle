class Solution {

    public int[] mostVisited(int n, int[] rounds) {
        // Only the first and last sectors of the whole marathon matter: every
        // full lap around the track visits every sector once, so the total
        // visit count only differs on the final, partial lap. That partial
        // lap is exactly the arc from rounds[0] to rounds[rounds.length - 1].
        int start = rounds[0];
        int end = rounds[rounds.length - 1];
        if (start <= end) {
            int[] result = new int[end - start + 1];
            for (int sector = start; sector <= end; ++sector) result[sector - start] = sector;
            return result;
        }
        // The arc wraps past sector n back to sector 1.
        int[] result = new int[end + (n - start + 1)];
        int index = 0;
        for (int sector = 1; sector <= end; ++sector) result[index++] = sector;
        for (int sector = start; sector <= n; ++sector) result[index++] = sector;
        return result;
    }
}
