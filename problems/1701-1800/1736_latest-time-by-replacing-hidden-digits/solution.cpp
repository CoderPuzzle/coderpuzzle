class Solution {
  public:
    string maximumTime(string time) {
        // Fill each hidden digit with the largest value its seat allows:
        // the hour tens seat takes '2' unless the hour ones seat is a
        // fixed 4-9 (which would build 24 or beyond), where '1' is the
        // best legal choice; the hour ones seat caps at '3' under a
        // final '2' tens, else '9'; the minute seats are unconstrained
        // and max out at '5' and '9'.
        if (time[0] == '?') {
            time[0] = (time[1] == '?' || time[1] <= '3') ? '2' : '1';
        }
        if (time[1] == '?') {
            time[1] = time[0] == '2' ? '3' : '9';
        }
        if (time[3] == '?') {
            time[3] = '5';
        }
        if (time[4] == '?') {
            time[4] = '9';
        }
        return time;
    }
};
