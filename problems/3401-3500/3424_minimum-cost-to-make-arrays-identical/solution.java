import java.util.Arrays;

class Solution {

    public long minCost(int[] arr, int[] brr, long k) {
        // Splitting into singleton blocks already realizes any
        // permutation, so one paid rearrangement is all Operation 1 can
        // offer; matching sorted to sorted then minimizes sum |a - b|
        // over permutations. The answer is the cheaper of leaving arr put
        // and paying k plus that matched cost. Sums reach 2 * 10^10 and
        // k itself is up to 2 * 10^10, so everything accumulates in long.
        long direct = 0;
        for (int i = 0; i < arr.length; i++) {
            direct += Math.abs(arr[i] - brr[i]);
        }
        int[] sa = arr.clone();
        int[] sb = brr.clone();
        Arrays.sort(sa);
        Arrays.sort(sb);
        long matched = k;
        for (int i = 0; i < sa.length; i++) {
            matched += Math.abs(sa[i] - sb[i]);
        }
        return Math.min(direct, matched);
    }
}
