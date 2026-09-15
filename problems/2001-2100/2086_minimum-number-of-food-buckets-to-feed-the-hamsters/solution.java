class Solution {

    public int minimumBuckets(String hamsters) {
        char[] street = hamsters.toCharArray();
        int buckets = 0;
        for (int index = 0; index < street.length; index++) {
            if (street[index] != 'H') {
                continue;
            }
            if (index > 0 && street[index - 1] == 'B') {
                continue;
            }
            if (index + 1 < street.length && street[index + 1] == '.') {
                street[index + 1] = 'B';
                buckets++;
            } else if (index > 0 && street[index - 1] == '.') {
                street[index - 1] = 'B';
                buckets++;
            } else {
                return -1;
            }
        }
        return buckets;
    }
}
