use std::cmp::Reverse;
use std::collections::BinaryHeap;
use std::collections::HashMap;

pub struct FoodRatings {
    info: HashMap<String, (String, i32)>,
    by_team: HashMap<String, BinaryHeap<Reverse<(i32, String)>>>,
}

impl FoodRatings {
    pub fn new(players: Vec<String>, teams: Vec<String>, scores: Vec<i32>) -> Self {
        let mut ratings = FoodRatings {
            info: HashMap::new(),
            by_team: HashMap::new(),
        };
        for ((player, team), rating) in players.into_iter().zip(teams).zip(scores) {
            ratings.info.insert(player.clone(), (team.clone(), rating));
            // The min of (-rating, name) is exactly the required winner:
            // highest rating first, ties to the smaller name.
            ratings
                .by_team
                .entry(team)
                .or_default()
                .push(Reverse((-rating, player)));
        }
        ratings
    }

    pub fn changeRating(&mut self, player: String, score: i32) {
        // Lazy deletion: push a fresh entry and leave the outdated one in the
        // heap as garbage; only the info map holds the current rating.
        let record = self.info.get_mut(&player).unwrap();
        let team = record.0.clone();
        record.1 = score;
        self.by_team.get_mut(&team).unwrap().push(Reverse((-score, player)));
    }

    pub fn highestRated(&mut self, team: String) -> String {
        let heap = match self.by_team.get_mut(&team) {
            Some(heap) => heap,
            None => return String::new(),
        };
        while let Some(top) = heap.peek() {
            let (negRating, player) = &top.0;
            // An entry is stale when its rating disagrees with the player's
            // current rating; a valid top is peeked, never consumed.
            if self.info.get(player).map(|(_, rating)| *rating) == Some(-*negRating) {
                return player.clone();
            }
            heap.pop();
        }
        String::new()
    }
}
