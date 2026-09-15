use std::cmp::Reverse;
use std::collections::{BinaryHeap, HashMap};

// A lazy-deletion max-priority queue: every priority update pushes a fresh
// entry, and pollHighest pops stale entries whose stored priority no longer
// matches the live map value. The heap holds (priority, Reverse(eventId)),
// so the max-heap yields the highest priority with the smallest eventId on
// ties.
pub struct EventManager {
    priority: HashMap<i32, i32>,
    heap: BinaryHeap<(i32, Reverse<i32>)>,
}

impl EventManager {
    pub fn new(events: Vec<Vec<i32>>) -> Self {
        let mut manager = EventManager {
            priority: HashMap::new(),
            heap: BinaryHeap::new(),
        };
        for event in events {
            manager.priority.insert(event[0], event[1]);
            manager.heap.push((event[1], Reverse(event[0])));
        }
        manager
    }

    pub fn updatePriority(&mut self, eventId: i32, newPriority: i32) {
        self.priority.insert(eventId, newPriority);
        self.heap.push((newPriority, Reverse(eventId)));
    }

    pub fn pollHighest(&mut self) -> i32 {
        while let Some((prio, Reverse(event_id))) = self.heap.pop() {
            if self.priority.get(&event_id) == Some(&prio) {
                self.priority.remove(&event_id);
                return event_id;
            }
        }
        -1
    }
}
