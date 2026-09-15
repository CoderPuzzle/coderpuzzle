class Solution {

    public int[] minOperations(String boxes) {
        // One ball hop between adjacent boxes costs 1, so gathering into
        // box i costs sum |i - j| over boxes j holding a ball. Sweeping
        // left to right, moving the gather point from i-1 to i adds one
        // step per ball at or left of i — so carry (count, ops) forward.
        int n = boxes.length();
        int[] answer = new int[n];
        int count = 0,
            ops = 0;
        for (int i = 0; i < n; i++) {
            answer[i] += ops;
            count += boxes.charAt(i) == '1' ? 1 : 0;
            ops += count;
        }
        count = 0;
        ops = 0;
        for (int i = n - 1; i >= 0; i--) {
            answer[i] += ops;
            count += boxes.charAt(i) == '1' ? 1 : 0;
            ops += count;
        }
        return answer;
    }
}
