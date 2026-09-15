class Solution {

    public int numberOfWays(String corridor) {
        // Sections pair the seats up in order, so exactly one divider is
        // forced between each finished pair and the next seat — placeable
        // at any of the plants-plus-one positions inside that gap.
        final int MOD = 1_000_000_007;
        long ways = 1;
        int seats = 0;
        int plants = 0;
        for (int i = 0; i < corridor.length(); i++) {
            if (corridor.charAt(i) == 'S') {
                seats++;
                if (seats > 2 && seats % 2 == 1) {
                    ways = (ways * (plants + 1)) % MOD;
                }
                plants = 0;
            } else if (seats >= 2) {
                plants++;
            }
        }
        return seats > 0 && seats % 2 == 0 ? (int) ways : 0;
    }
}
