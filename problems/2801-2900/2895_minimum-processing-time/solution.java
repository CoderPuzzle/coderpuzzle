import java.util.Arrays;

class Solution {

    public int minProcessingTime(int[] processorTime, int[] tasks) {
        // Every term is at most 10^9, so each pair sum stays inside int.
        Arrays.sort(processorTime);
        int[] desc = tasks.clone();
        Arrays.sort(desc);
        int answer = 0;
        for (int i = 0; i < desc.length; ++i) {
            answer = Math.max(answer, processorTime[i / 4] + desc[desc.length - 1 - i]);
        }
        return answer;
    }
}
