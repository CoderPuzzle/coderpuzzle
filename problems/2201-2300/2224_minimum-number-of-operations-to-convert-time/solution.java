class Solution {

    public int convertTime(String current, String correct) {
        int diff = toMinutes(correct) - toMinutes(current);
        int operations = 0;
        for (int step : new int[] { 60, 15, 5, 1 }) {
            operations += diff / step;
            diff %= step;
        }
        return operations;
    }

    private int toMinutes(String time) {
        return (
            (time.charAt(0) - '0') * 600 +
            (time.charAt(1) - '0') * 60 +
            (time.charAt(3) - '0') * 10 +
            (time.charAt(4) - '0')
        );
    }
}
