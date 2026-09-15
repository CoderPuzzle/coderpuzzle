function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    // Base case: an empty list is already sorted, so the other list —
    // whatever remains of it — is the merged continuation as is.
    if (list1 === null) {
        return list2;
    }
    if (list2 === null) {
        return list1;
    }
    // The smaller head stands in front; the recursion merges what follows
    // it with the untouched other list. <= keeps list1 first on ties,
    // matching the iterative merge's stability.
    if (list1.val <= list2.val) {
        list1.next = mergeTwoLists(list1.next, list2);
        return list1;
    }
    list2.next = mergeTwoLists(list1, list2.next);
    return list2;
}
