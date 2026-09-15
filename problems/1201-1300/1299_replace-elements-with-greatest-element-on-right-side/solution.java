class Solution {

    public int[] replaceElements(int[] arr) {
        // Sweep right to left: answer[i] is the max seen strictly right of
        // i, which the running maximum holds before arr[i] joins it.
        int[] answer = new int[arr.length];
        int runningMax = -1;
        for (int i = arr.length - 1; i >= 0; --i) {
            answer[i] = runningMax;
            if (arr[i] > runningMax) runningMax = arr[i];
        }
        return answer;
    }
}
