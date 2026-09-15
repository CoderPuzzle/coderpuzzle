class Solution {
    printLinkedListInReverse(head) {
        // Forward is the only direction the API offers, and output must run
        // backward — recurse to the end first, then print on the way back,
        // letting the call stack hold the not-yet-printed prefix.
        if (head === null) {
            return;
        }
        this.printLinkedListInReverse(head.getNext());
        head.printValue();
    }
}
