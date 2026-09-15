class Solution {

    public int[] resultArray(int[] nums) {
        // Literal simulation: seed arr1 with nums[0] and arr2 with nums[1],
        // then route each later element to whichever tail is greater.
        // Distinct values mean the tails never tie, so this is decisive.
        int[] arr1 = new int[nums.length];
        int[] arr2 = new int[nums.length];
        int size1 = 0;
        int size2 = 0;
        arr1[size1++] = nums[0];
        arr2[size2++] = nums[1];
        for (int i = 2; i < nums.length; ++i) {
            if (arr1[size1 - 1] > arr2[size2 - 1]) {
                arr1[size1++] = nums[i];
            } else {
                arr2[size2++] = nums[i];
            }
        }
        int[] result = new int[size1 + size2];
        System.arraycopy(arr1, 0, result, 0, size1);
        System.arraycopy(arr2, 0, result, size1, size2);
        return result;
    }
}
