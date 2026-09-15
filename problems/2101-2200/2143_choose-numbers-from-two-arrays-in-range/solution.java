class Solution {

    public int countSubranges(int[] nums1, int[] nums2) {
        int mod = 1_000_000_007;
        int offset = 10_000;
        int size = 20_001;
        int[] previous = new int[size];
        int answer = 0;
        for (int index = 0; index < nums1.length; index++) {
            int[] current = new int[size];
            current[offset + nums1[index]] = 1;
            current[offset - nums2[index]] = (current[offset - nums2[index]] + 1) % mod;
            for (int position = 0; position < size; position++) {
                if (previous[position] == 0) {
                    continue;
                }
                if (position + nums1[index] < size) {
                    current[position + nums1[index]] = (current[position + nums1[index]] + previous[position]) % mod;
                }
                if (position - nums2[index] >= 0) {
                    current[position - nums2[index]] = (current[position - nums2[index]] + previous[position]) % mod;
                }
            }
            answer = (answer + current[offset]) % mod;
            previous = current;
        }
        return answer;
    }
}
