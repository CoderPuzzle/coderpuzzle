import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Queue;

class Solution {

    public int minOperations(int[] nums) {
        int n = nums.length;
        int position = indexOf(nums, 0);
        int targetKind;
        int targetShift;
        if (isRotationOfSorted(nums, position)) {
            targetKind = 0;
            targetShift = position;
        } else {
            int[] reversed = new int[n];
            for (int i = 0; i < n; i++) reversed[i] = nums[n - i - 1];
            int reversedPosition = indexOf(reversed, 0);
            if (!isRotationOfSorted(reversed, reversedPosition)) {
                return -1;
            }
            targetKind = 1;
            targetShift = reversedPosition;
        }

        int[][] distance = new int[2][n];
        for (int[] row : distance) Arrays.fill(row, -1);
        Queue<Integer> queue = new ArrayDeque<>();
        distance[0][0] = 0;
        queue.add(0);
        while (!queue.isEmpty()) {
            int state = queue.remove();
            int kind = state / n;
            int shift = state % n;
            if (kind == targetKind && shift == targetShift) {
                return distance[kind][shift];
            }
            int[][] neighbors = { { kind, (shift + 1) % n }, { 1 - kind, (n - shift) % n } };
            for (int[] neighbor : neighbors) {
                int nextKind = neighbor[0];
                int nextShift = neighbor[1];
                if (distance[nextKind][nextShift] == -1) {
                    distance[nextKind][nextShift] = distance[kind][shift] + 1;
                    queue.add(nextKind * n + nextShift);
                }
            }
        }
        return -1;
    }

    private int indexOf(int[] values, int target) {
        for (int i = 0; i < values.length; i++) {
            if (values[i] == target) return i;
        }
        return -1;
    }

    private boolean isRotationOfSorted(int[] values, int start) {
        int n = values.length;
        for (int i = 0; i < n; i++) {
            if (values[(start + i) % n] != i) return false;
        }
        return true;
    }
}
