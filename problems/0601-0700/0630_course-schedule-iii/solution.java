import java.util.Arrays;
import java.util.Comparator;
import java.util.PriorityQueue;

class Solution {

    public int scheduleCourse(int[][] courses) {
        Arrays.sort(courses, Comparator.comparingInt(course -> course[1]));
        PriorityQueue<Integer> heap = new PriorityQueue<>(Comparator.reverseOrder());
        long total = 0;
        for (int[] course : courses) {
            int duration = course[0];
            int lastDay = course[1];
            if (total + duration <= lastDay) {
                total += duration;
                heap.add(duration);
            } else if (!heap.isEmpty() && heap.peek() > duration) {
                total += duration - heap.poll();
                heap.add(duration);
            }
        }
        return heap.size();
    }
}
