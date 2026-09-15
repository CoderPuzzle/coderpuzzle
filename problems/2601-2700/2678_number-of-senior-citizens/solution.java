class Solution {

    public int countSeniors(String[] details) {
        // The age is the two-digit field at offsets 11-12; char-code
        // arithmetic decodes it without building a substring. The count is
        // at most details.length <= 100, so int is plenty.
        int count = 0;
        for (String record : details) {
            int age = (record.charAt(11) - '0') * 10 + (record.charAt(12) - '0');
            if (age > 60) {
                count++;
            }
        }
        return count;
    }
}
