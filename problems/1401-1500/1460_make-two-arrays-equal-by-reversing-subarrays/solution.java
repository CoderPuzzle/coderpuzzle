class Solution {

    public boolean canBeEqual(int[] target, int[] arr) {
        int[] counts = new int[1001];
        for (int value : target) {
            counts[value]++;
        }
        for (int value : arr) {
            counts[value]--;
        }
        for (int count : counts) {
            if (count != 0) {
                return false;
            }
        }
        return true;
    }
}
