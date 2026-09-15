class Solution {

    public long minimumCost(int cost1, int cost2, int costBoth, int need1, int need2) {
        // Price each unit independently. A unit counted toward BOTH
        // requirements comes as one type 3 item or as one item of each
        // type, whichever is cheaper; a leftover unit of a single
        // requirement comes as that type's own item or as a type 3 item
        // whose spare contribution is wasted, whichever is cheaper.
        // Units never interact, so the per-unit minima sum to the global
        // minimum. Needs reach 1e9 against costs of 1e6, so totals pass
        // 2e15 and the 32-bit range -- they accumulate in a long.
        long pairs = Math.min(need1, need2);
        long pairCost = Math.min(costBoth, (long) cost1 + cost2);
        long rest1 = Math.min(costBoth, cost1);
        long rest2 = Math.min(costBoth, cost2);
        return pairs * pairCost + (need1 - pairs) * rest1 + (need2 - pairs) * rest2;
    }
}
