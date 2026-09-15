import java.util.ArrayList;
import java.util.List;

class Solution {

    public List<ListNode> splitCircularLinkedList(ListNode list) {
        int count = 1;
        ListNode tail = list;
        while (tail.next != list) {
            tail = tail.next;
            count++;
        }
        int half = (count + 1) / 2;
        ListNode firstTail = list;
        for (int i = 0; i < half - 1; i++) firstTail = firstTail.next;
        ListNode secondHead = firstTail.next;
        ListNode secondTail = secondHead;
        while (secondTail.next != list) secondTail = secondTail.next;
        firstTail.next = list;
        secondTail.next = secondHead;
        List<ListNode> answer = new ArrayList<>();
        answer.add(list);
        answer.add(secondHead);
        return answer;
    }
}
