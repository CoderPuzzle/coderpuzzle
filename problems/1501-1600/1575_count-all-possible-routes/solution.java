class Solution {

    private static final int MOD = 1_000_000_007;

    private int[] locations;
    private int finish;
    private Long[][] memo;

    public int countRoutes(int[] locations, int start, int finish, int fuel) {
        this.locations = locations;
        this.finish = finish;
        this.memo = new Long[locations.length][fuel + 1];
        return (int) routesFrom(start, fuel);
    }

    private long routesFrom(int city, int remaining) {
        if (memo[city][remaining] != null) return memo[city][remaining];
        // A route may stop here (only valid when this city is the destination)
        // or continue on to any other city that still leaves non-negative
        // fuel; both possibilities are counted.
        long total = city == finish ? 1 : 0;
        for (int neighbor = 0; neighbor < locations.length; ++neighbor) {
            if (neighbor == city) continue;
            int cost = Math.abs(locations[city] - locations[neighbor]);
            if (cost <= remaining) total += routesFrom(neighbor, remaining - cost);
        }
        total %= MOD;
        memo[city][remaining] = total;
        return total;
    }
}
