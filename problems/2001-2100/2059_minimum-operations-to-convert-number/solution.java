import java.util.ArrayDeque;

class Solution {

    public int minimumOperations(int[] nums, int start, int goal) {
        int[] distance = new int[1001];
        java.util.Arrays.fill(distance, -1);
        distance[start] = 0;
        ArrayDeque<Integer> queue = new ArrayDeque<>();
        queue.add(start);

        while (!queue.isEmpty()) {
            int value = queue.remove();
            int nextDistance = distance[value] + 1;
            for (int number : nums) {
                int[] candidates = { value + number, value - number, value ^ number };
                for (int candidate : candidates) {
                    if (candidate == goal) return nextDistance;
                    if (candidate >= 0 && candidate <= 1000 && distance[candidate] == -1) {
                        distance[candidate] = nextDistance;
                        queue.add(candidate);
                    }
                }
            }
        }
        return -1;
    }
}
