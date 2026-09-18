use std::cmp::Reverse;
use std::collections::{BinaryHeap, HashMap};

// One unrented copy on a movie's shelf; derived ordering compares
// price then shop, exactly the search order.
#[derive(PartialEq, Eq, PartialOrd, Ord)]
struct ShelfEntry {
    price: i32,
    shop: i32,
    token: u64,
}

// One rented copy, competing globally by price then shop then movie,
// exactly the report order.
#[derive(PartialEq, Eq, PartialOrd, Ord)]
struct RentedEntry {
    price: i32,
    shop: i32,
    movie: i32,
    token: u64,
}

pub struct MovieRentingSystem {
    price: HashMap<(i32, i32), i32>,
    unrented: HashMap<i32, BinaryHeap<Reverse<ShelfEntry>>>,
    unrented_token: HashMap<(i32, i32), u64>,
    rented: BinaryHeap<Reverse<RentedEntry>>,
    rented_token: HashMap<(i32, i32), u64>,
    serial: u64,
}

impl MovieRentingSystem {
    pub fn new(n: i32, entries: Vec<Vec<i32>>) -> Self {
        let mut desk = MovieRentingSystem {
            price: HashMap::new(),
            unrented: HashMap::new(),
            unrented_token: HashMap::new(),
            rented: BinaryHeap::new(),
            rented_token: HashMap::new(),
            serial: 0,
        };
        for entry in &entries {
            let (shop, movie, price) = (entry[0], entry[1], entry[2]);
            desk.price.insert((shop, movie), price);
            desk.serial += 1;
            desk.unrented_token.insert((shop, movie), desk.serial);
            desk.unrented.entry(movie).or_default().push(Reverse(ShelfEntry {
                price,
                shop,
                token: desk.serial,
            }));
        }
        desk
    }

    pub fn search(&mut self, movie: i32) -> Vec<i32> {
        let mut result: Vec<i32> = Vec::new();
        let mut kept: Vec<Reverse<ShelfEntry>> = Vec::new();
        if let Some(shelf) = self.unrented.get_mut(&movie) {
            while let Some(Reverse(entry)) = shelf.pop() {
                if result.len() == 5 {
                    kept.push(Reverse(entry)); // untouched: put it back below
                    break;
                }
                if self.unrented_token.get(&(entry.shop, movie)) != Some(&entry.token) {
                    continue; // stale entry from a rent/handBack cycle
                }
                result.push(entry.shop);
                kept.push(Reverse(entry));
            }
            for entry in kept {
                shelf.push(entry);
            }
        }
        result
    }

    pub fn rent(&mut self, shop: i32, movie: i32) {
        self.unrented_token.remove(&(shop, movie));
        self.serial += 1;
        self.rented_token.insert((shop, movie), self.serial);
        let price = self.price[&(shop, movie)];
        self.rented.push(Reverse(RentedEntry {
            price,
            shop,
            movie,
            token: self.serial,
        }));
    }

    pub fn drop(&mut self, shop: i32, movie: i32) {
        self.rented_token.remove(&(shop, movie));
        self.serial += 1;
        self.unrented_token.insert((shop, movie), self.serial);
        let price = self.price[&(shop, movie)];
        self.unrented.entry(movie).or_default().push(Reverse(ShelfEntry {
            price,
            shop,
            token: self.serial,
        }));
    }

    pub fn report(&mut self) -> Vec<Vec<i32>> {
        let mut result: Vec<Vec<i32>> = Vec::new();
        let mut kept: Vec<Reverse<RentedEntry>> = Vec::new();
        while let Some(Reverse(entry)) = self.rented.pop() {
            if result.len() == 5 {
                kept.push(Reverse(entry));
                break;
            }
            if self.rented_token.get(&(entry.shop, entry.movie)) != Some(&entry.token) {
                continue;
            }
            result.push(vec![entry.shop, entry.movie]);
            kept.push(Reverse(entry));
        }
        for entry in kept {
            self.rented.push(entry);
        }
        result
    }
}
