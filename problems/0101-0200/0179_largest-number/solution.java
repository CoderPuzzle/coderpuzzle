import java.util.Arrays;

class Solution {

    public String largestNumber(int[] nums) {
        String[] strs = new String[nums.length];
        for (int i = 0; i < nums.length; i++) {
            strs[i] = String.valueOf(nums[i]);
        }
        // a precedes b exactly when the concatenation b + a is lexicographically
        // smaller than a + b — numeric comparison is useless (3 must come
        // before 30). A sorted result admits no adjacent swap that enlarges
        // the string, so it is the maximal arrangement.
        Arrays.sort(strs, (a, b) -> (b + a).compareTo(a + b));
        StringBuilder sb = new StringBuilder();
        for (String s : strs) {
            sb.append(s);
        }
        String result = sb.toString();
        // Leading zero means every input was 0.
        return result.charAt(0) == '0' ? "0" : result;
    }
}
