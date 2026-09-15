class Solution {

    public int minNumberOfFrogs(String croakOfFrogs) {
        String order = "croak";
        int[] counts = new int[5];
        int active = 0;
        int answer = 0;
        for (int i = 0; i < croakOfFrogs.length(); i++) {
            int index = order.indexOf(croakOfFrogs.charAt(i));
            if (index < 0) {
                return -1;
            }
            if (index == 0) {
                counts[0]++;
                active++;
                answer = Math.max(answer, active);
            } else {
                if (counts[index - 1] == 0) {
                    return -1;
                }
                counts[index - 1]--;
                counts[index]++;
                if (index == 4) {
                    active--;
                }
            }
        }
        for (int i = 0; i < 4; i++) {
            if (counts[i] != 0) {
                return -1;
            }
        }
        return answer;
    }
}
