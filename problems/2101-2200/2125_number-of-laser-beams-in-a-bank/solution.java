class Solution {

    public int numberOfBeams(String[] bank) {
        int beams = 0;
        int previous = 0;
        for (String row : bank) {
            int devices = 0;
            for (int index = 0; index < row.length(); index++) {
                if (row.charAt(index) == '1') {
                    devices++;
                }
            }
            if (devices > 0) {
                beams += previous * devices;
                previous = devices;
            }
        }
        return beams;
    }
}
