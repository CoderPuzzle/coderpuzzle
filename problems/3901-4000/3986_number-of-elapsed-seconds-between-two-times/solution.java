class Solution {

    public int secondsBetweenTimes(String startTime, String endTime) {
        return seconds(endTime) - seconds(startTime);
    }

    private int seconds(String value) {
        int hours = (value.charAt(0) - '0') * 10 + (value.charAt(1) - '0');
        int minutes = (value.charAt(3) - '0') * 10 + (value.charAt(4) - '0');
        int seconds = (value.charAt(6) - '0') * 10 + (value.charAt(7) - '0');
        return hours * 3600 + minutes * 60 + seconds;
    }
}
