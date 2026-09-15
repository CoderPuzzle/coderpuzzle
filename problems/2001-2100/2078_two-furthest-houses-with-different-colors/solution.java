class Solution {

    public int maxDistance(int[] colors) {
        int last = colors.length - 1;
        int answer = 0;
        for (int index = 0; index < colors.length; index++) {
            if (colors[index] != colors[0]) {
                answer = Math.max(answer, index);
            }
            if (colors[index] != colors[last]) {
                answer = Math.max(answer, last - index);
            }
        }
        return answer;
    }
}
