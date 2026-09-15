import java.util.Arrays;

class Solution {

    public int minimumCost(int m, int n, int[] horizontalCut, int[] verticalCut) {
        // A cut costs its base price times the pieces it crosses: one more
        // for every opposite-direction cut already made. An exchange argument
        // (swapping adjacent opposite cuts never helps unless the pricier one
        // goes first) makes "expensive cuts early" the optimal schedule.
        int[] hcuts = horizontalCut.clone();
        int[] vcuts = verticalCut.clone();
        Arrays.sort(hcuts);
        Arrays.sort(vcuts);
        reverse(hcuts);
        reverse(vcuts);
        int i = 0,
            j = 0;
        int hMade = 0,
            vMade = 0;
        long total = 0;
        // Two-pointer merge: always take the head with the larger base cost,
        // while its multiplier (opposite cuts made + 1) is still small.
        while (i < hcuts.length && j < vcuts.length) {
            // Ties (>=) may go to the horizontal head: equal base costs are
            // interchangeable in the exchange argument.
            if (hcuts[i] >= vcuts[j]) {
                total += (long) hcuts[i] * (vMade + 1);
                i++;
                hMade++;
            } else {
                total += (long) vcuts[j] * (hMade + 1);
                j++;
                vMade++;
            }
        }
        // One direction is drained, so the other's multiplier is now fixed.
        while (i < hcuts.length) {
            total += (long) hcuts[i] * (vMade + 1);
            i++;
        }
        while (j < vcuts.length) {
            total += (long) vcuts[j] * (hMade + 1);
            j++;
        }
        return (int) total;
    }

    private void reverse(int[] arr) {
        for (int l = 0, r = arr.length - 1; l < r; l++, r--) {
            int t = arr[l];
            arr[l] = arr[r];
            arr[r] = t;
        }
    }
}
