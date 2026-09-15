import java.util.Arrays;

class Solution {

    public long countGoodSubarrays(int[] nums) {
        // A subarray is good iff its bitwise OR equals its maximum element,
        // i.e. every element's bits are contained in the max's bits. Count
        // each subarray at its rightmost maximum: index i owns subarrays
        // inside (left[i], right[i]) from two monotonic stacks, and the bit
        // condition shrinks that window to the nearest element on each side
        // carrying a bit absent from nums[i]. At n = 10^5 the answer reaches
        // n(n+1)/2 ~ 5*10^9, so the accumulator is a long.
        int n = nums.length;
        int[] left = new int[n];
        int[] right = new int[n];
        int[] stack = new int[n];
        int size = 0;
        for (int i = 0; i < n; ++i) {
            while (size > 0 && nums[stack[size - 1]] <= nums[i]) {
                size--;
            }
            left[i] = size > 0 ? stack[size - 1] : -1;
            stack[size++] = i;
        }
        size = 0;
        for (int i = n - 1; i >= 0; --i) {
            while (size > 0 && nums[stack[size - 1]] < nums[i]) {
                size--;
            }
            right[i] = size > 0 ? stack[size - 1] : n;
            stack[size++] = i;
        }
        int bits = 31; // nums[i] < 2^30; bit 30 stays unused
        int[] last = new int[bits];
        int[] nxt = new int[bits];
        Arrays.fill(last, -1);
        Arrays.fill(nxt, n);
        int[] maxLeft = new int[n];
        int[] minRight = new int[n];
        for (int i = 0; i < n; ++i) {
            int x = nums[i];
            int m = -1;
            for (int b = 0; b < bits; ++b) {
                if (((x >> b) & 1) == 0 && last[b] > m) {
                    m = last[b];
                }
            }
            maxLeft[i] = m;
            int y = x;
            while (y != 0) {
                int low = y & -y;
                last[Integer.numberOfTrailingZeros(low)] = i;
                y ^= low;
            }
        }
        for (int i = n - 1; i >= 0; --i) {
            int x = nums[i];
            int m = n;
            for (int b = 0; b < bits; ++b) {
                if (((x >> b) & 1) == 0 && nxt[b] < m) {
                    m = nxt[b];
                }
            }
            minRight[i] = m;
            int y = x;
            while (y != 0) {
                int low = y & -y;
                nxt[Integer.numberOfTrailingZeros(low)] = i;
                y ^= low;
            }
        }
        long ans = 0;
        for (int i = 0; i < n; ++i) {
            int lo = left[i] > maxLeft[i] ? left[i] : maxLeft[i];
            int hi = right[i] < minRight[i] ? right[i] : minRight[i];
            ans += (long) (i - lo) * (hi - i);
        }
        return ans;
    }
}
