use std::collections::HashMap;

impl Solution {
    pub fn can_form_array(arr: Vec<i32>, pieces: Vec<Vec<i32>>) -> bool {
        // Every value across pieces is distinct, so a piece is uniquely
        // identified by its first element. Map that value to the piece,
        // then walk arr and match pieces to consecutive slices.
        let mut first: HashMap<i32, &Vec<i32>> = HashMap::new();
        for piece in &pieces {
            first.insert(piece[0], piece);
        }

        let mut index = 0;
        while index < arr.len() {
            let piece = match first.get(&arr[index]) {
                Some(p) => *p,
                None => return false,
            };
            if index + piece.len() > arr.len() || &arr[index..index + piece.len()] != piece.as_slice() {
                return false;
            }
            index += piece.len();
        }
        true
    }
}
