class Solution {

    public boolean isPalindrome(ListNode head) {
        // First pass counts the nodes so the copy is one exact array.
        int n = 0;
        for (ListNode node = head; node != null; node = node.next) {
            n++;
        }
        // Second pass copies the values out; the list is never rearranged.
        int[] values = new int[n];
        int k = 0;
        for (ListNode node = head; node != null; node = node.next) {
            values[k++] = node.val;
        }
        // Two-ended compare: i walks forward, j backward, and every mirror
        // pair must agree before the indices meet in the middle.
        int i = 0;
        int j = n - 1;
        while (i < j) {
            if (values[i] != values[j]) {
                return false;
            }
            i++;
            j--;
        }
        return true;
    }
}
