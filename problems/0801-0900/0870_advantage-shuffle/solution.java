import java.util.*;

class Solution {

    public int[] advantageCount(int[] nums1, int[] nums2) {
        final int[] values = nums1.clone();
        Arrays.sort(values);
        final int size = values.length;
        final int[] tree = new int[size + 1];

        for (int rank = 1; rank <= size; rank++) {
            update(tree, size, rank, 1);
        }

        int[] result = new int[size];
        for (int t = 0; t < size; t++) {
            int value = nums2[t];
            int lessOrEqual = prefixCount(tree, upperBound(values, value));
            int rank = kthSmallest(tree, size, lessOrEqual + 1);
            if (rank > size) {
                rank = kthSmallest(tree, size, 1);
            }
            update(tree, size, rank, -1);
            result[t] = values[rank - 1];
        }
        return result;
    }

    private void update(int[] tree, int size, int index, int delta) {
        for (; index <= size; index += index & -index) {
            tree[index] += delta;
        }
    }

    private int prefixCount(int[] tree, int index) {
        int total = 0;
        for (; index > 0; index -= index & -index) {
            total += tree[index];
        }
        return total;
    }

    private int kthSmallest(int[] tree, int size, int k) {
        int index = 0;
        int remaining = k;
        int step = Integer.highestOneBit(Math.max(size, 1));
        while (step < size) {
            step <<= 1;
        }
        while (step > 0) {
            int next = index + step;
            if (next <= size && tree[next] < remaining) {
                index = next;
                remaining -= tree[next];
            }
            step >>= 1;
        }
        return index + 1;
    }

    private int upperBound(int[] values, int value) {
        int lo = 0;
        int hi = values.length;
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (values[mid] <= value) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    }
}
