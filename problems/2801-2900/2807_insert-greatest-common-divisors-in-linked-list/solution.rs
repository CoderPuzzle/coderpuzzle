impl Solution {
    pub fn insert_greatest_common_divisors(mut head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        // Original nodes only ever gain a successor, so one cursor splices each
        // gcd in place: rethread `next` to a fresh node carrying the pair's
        // gcd, then hop to that untouched successor so the next original pair
        // is examined next and the walk stops on the final original node.
        let mut cur = head.as_mut();
        while let Some(node) = cur {
            let next_val = match node.next.as_ref() {
                Some(next) => next.val,
                None => break,
            };
            let inserted = Box::new(ListNode {
                val: gcd(node.val, next_val),
                next: node.next.take(),
            });
            node.next = Some(inserted);
            cur = node.next.as_mut().unwrap().next.as_mut();
        }
        head
    }
}

fn gcd(mut a: i32, mut b: i32) -> i32 {
    while b != 0 {
        let t = a % b;
        a = b;
        b = t;
    }
    a
}
