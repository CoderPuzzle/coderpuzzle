class Solution {

    public long waysToReachStair(int k) {
        // With x up-ops the top height is 2^x, so ending on stair k takes
        // y = 2^x - k down-ops; they must sit in distinct gaps among the
        // x + 1 slots around the ups, giving C(x + 1, y) orderings. Each
        // product/division step is an exact binomial, within int range.
        long total = 0;
        for (int ups = 0; ; ups++) {
            int downs = (1 << ups) - k;
            if (downs > ups + 1) {
                break;
            }
            if (downs >= 0) {
                long ways = 1;
                for (int i = 0; i < downs; i++) {
                    ways = (ways * (ups + 1 - i)) / (i + 1);
                }
                total += ways;
            }
        }
        return total;
    }
}
