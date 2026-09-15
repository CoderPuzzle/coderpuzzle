use std::collections::HashSet;
use std::collections::VecDeque;

// Two FIFO queues plus a waiting set: riders and drivers queue in arrival
// order, matchDriverWithRider pairs the two fronts, and cancelRider only
// unmarks the rider — a later match lazily skips any front rider that is
// no longer waiting, so cancellation never shifts the queue.
pub struct RideSharingSystem {
    riders: VecDeque<i32>,
    drivers: VecDeque<i32>,
    waiting: HashSet<i32>,
}

impl RideSharingSystem {
    pub fn new() -> Self {
        RideSharingSystem {
            riders: VecDeque::new(),
            drivers: VecDeque::new(),
            waiting: HashSet::new(),
        }
    }

    pub fn addRider(&mut self, riderId: i32) {
        self.riders.push_back(riderId);
        self.waiting.insert(riderId);
    }

    pub fn addDriver(&mut self, driverId: i32) {
        self.drivers.push_back(driverId);
    }

    pub fn matchDriverWithRider(&mut self) -> Vec<i32> {
        while let Some(&front) = self.riders.front() {
            if self.waiting.contains(&front) {
                break;
            }
            self.riders.pop_front();
        }
        if self.riders.is_empty() || self.drivers.is_empty() {
            return vec![-1, -1];
        }
        let driver_id = self.drivers.pop_front().expect("driver present");
        let rider_id = self.riders.pop_front().expect("rider present");
        self.waiting.remove(&rider_id);
        vec![driver_id, rider_id]
    }

    pub fn cancelRider(&mut self, riderId: i32) {
        self.waiting.remove(&riderId);
    }
}
