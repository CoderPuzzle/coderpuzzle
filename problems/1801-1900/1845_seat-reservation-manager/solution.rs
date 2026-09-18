use std::cmp::Reverse;
use std::collections::BinaryHeap;

pub struct SeatManager {
    // Largest seat number ever reserved: fresh seats march upward from here.
    next_seat: i32,
    // Min-heap holding ONLY currently returned seats — never the untouched ones.
    returned: BinaryHeap<Reverse<i32>>,
}

impl SeatManager {
    pub fn new(_n: i32) -> Self {
        SeatManager {
            next_seat: 1,
            returned: BinaryHeap::new(),
        }
    }

    pub fn reserve(&mut self) -> i32 {
        // Prefer the smallest returned seat; the top is always < next_seat,
        // so the two sources of free seats never overlap.
        if self
            .returned
            .peek()
            .map(|&Reverse(top)| top < self.next_seat)
            .unwrap_or(false)
        {
            return self.returned.pop().map(|Reverse(seat)| seat).unwrap();
        }
        // No outstanding returns: the next fresh seat is simply next_seat.
        self.next_seat += 1;
        self.next_seat - 1
    }

    pub fn unreserve(&mut self, seat: i32) {
        // The monotone counter march is disrupted by exactly this one seat.
        self.returned.push(Reverse(seat));
    }
}
