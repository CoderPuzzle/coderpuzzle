class Solution {

    public void printLinkedListInReverse(ImmutableListNode head) {
        // Forward is the only direction the API offers, and output must run
        // backward — recurse to the end first, then print on the way back,
        // letting the call stack hold the not-yet-printed prefix.
        if (head == null) {
            return;
        }
        printLinkedListInReverse(head.getNext());
        head.printValue();
    }
}
