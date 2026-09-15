class Solution {

    public int[] executeInstructions(int n, int[] startPos, String s) {
        int[] answer = new int[s.length()];
        for (int start = 0; start < s.length(); start++) {
            int row = startPos[0];
            int col = startPos[1];
            for (int index = start; index < s.length(); index++) {
                int nextRow = row;
                int nextCol = col;
                switch (s.charAt(index)) {
                    case 'L' -> nextCol--;
                    case 'R' -> nextCol++;
                    case 'U' -> nextRow--;
                    default -> nextRow++;
                }
                if (nextRow < 0 || nextRow >= n || nextCol < 0 || nextCol >= n) {
                    break;
                }
                row = nextRow;
                col = nextCol;
                answer[start]++;
            }
        }
        return answer;
    }
}
