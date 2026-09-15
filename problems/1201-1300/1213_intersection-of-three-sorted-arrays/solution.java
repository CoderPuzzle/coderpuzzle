class Solution {

    public int[] arraysIntersection(int[] arr1, int[] arr2, int[] arr3) {
        // One index per sorted array; the smallest current values can never
        // reappear ahead, so they are safe to step past.
        int i = 0,
            j = 0,
            k = 0;
        int[] tmp = new int[Math.min(arr1.length, Math.min(arr2.length, arr3.length))];
        int count = 0;
        while (i < arr1.length && j < arr2.length && k < arr3.length) {
            int a = arr1[i],
                b = arr2[j],
                c = arr3[k];
            if (a == b && b == c) {
                tmp[count++] = a;
                ++i;
                ++j;
                ++k;
                continue;
            }
            int smallest = Math.min(a, Math.min(b, c));
            if (a == smallest) ++i;
            if (b == smallest) ++j;
            if (c == smallest) ++k;
        }
        return java.util.Arrays.copyOf(tmp, count);
    }
}
