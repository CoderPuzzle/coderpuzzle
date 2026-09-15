import java.util.Arrays;

class Solution {

    public int[] sortArrayByParityII(int[] nums) {
        // The judge pins one exact answer: the even values sorted ascending
        // fill the even indices, and the odd values sorted ascending fill the
        // odd indices. One scan splits the values by parity into two half
        // arrays, Arrays.sort orders each group, and a dealing loop writes
        // them into the answer — values are compared only inside their own
        // parity group.
        int[] evens = new int[nums.length / 2];
        int[] odds = new int[nums.length / 2];
        int evenCount = 0;
        int oddCount = 0;
        for (int value : nums) {
            if (value % 2 == 0) {
                evens[evenCount++] = value;
            } else {
                odds[oddCount++] = value;
            }
        }
        Arrays.sort(evens);
        Arrays.sort(odds);
        int[] answer = new int[nums.length];
        for (int i = 0; i < evens.length; i++) {
            answer[2 * i] = evens[i];
            answer[2 * i + 1] = odds[i];
        }
        return answer;
    }
}
