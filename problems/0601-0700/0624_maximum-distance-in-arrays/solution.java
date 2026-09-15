class Solution {

    public int maxDistance(int[][] arrays) {
        // Only each array's first and last elements can sit in an optimal
        // pair, so one sweep holding the smallest first and the largest last
        // of the arrays already seen answers everything. Each new array tries
        // both of its ends against those running extremes — a pairing that
        // always spans two different arrays — and only afterwards folds its
        // own ends in, which keeps the global minimum and maximum from being
        // paired inside a single array.
        int best = 0;
        int lo = arrays[0][0];
        int hi = arrays[0][arrays[0].length - 1];
        for (int i = 1; i < arrays.length; i++) {
            int[] arr = arrays[i];
            int first = arr[0];
            int last = arr[arr.length - 1];
            best = Math.max(best, Math.max(Math.abs(first - hi), Math.abs(last - lo)));
            lo = Math.min(lo, first);
            hi = Math.max(hi, last);
        }
        return best;
    }
}
