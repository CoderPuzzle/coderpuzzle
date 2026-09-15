class Solution {

    public int missingNumber(int[] arr) {
        // Endpoints survive, so the full progression had arr.length+1 terms
        // from arr[0] to arr[-1]; the gap between its Gauss sum and the
        // surviving sum is the removed value.
        int n = arr.length;
        long full = ((long) (arr[0] + arr[arr.length - 1]) * (n + 1)) / 2;
        long sum = 0;
        for (int value : arr) sum += value;
        return (int) (full - sum);
    }
}
