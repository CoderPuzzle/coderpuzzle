class Solution {

    public int countPoints(String rings) {
        int[] masks = new int[10];
        for (int index = 0; index < rings.length(); index += 2) {
            char color = rings.charAt(index);
            int bit = color == 'R' ? 1 : color == 'G' ? 2 : 4;
            masks[rings.charAt(index + 1) - '0'] |= bit;
        }
        int answer = 0;
        for (int mask : masks) if (mask == 7) answer++;
        return answer;
    }
}
