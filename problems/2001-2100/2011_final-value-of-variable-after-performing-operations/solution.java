class Solution {

    public int finalValueAfterOperations(String[] operations) {
        int value = 0;
        for (String operation : operations) {
            value += operation.charAt(1) == '+' ? 1 : -1;
        }
        return value;
    }
}
