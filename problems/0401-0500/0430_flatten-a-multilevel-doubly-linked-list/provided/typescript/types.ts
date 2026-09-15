class MultiListNode {
    val: number;
    prev: MultiListNode | null;
    next: MultiListNode | null;
    child: MultiListNode | null;
    constructor(val?: number) {
        this.val = val ?? 0;
        this.prev = null;
        this.next = null;
        this.child = null;
    }
}
