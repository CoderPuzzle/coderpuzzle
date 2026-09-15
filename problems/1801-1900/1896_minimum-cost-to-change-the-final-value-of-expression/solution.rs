impl Solution {
    pub fn min_operations_to_flip(expression: String) -> i32 {
        fn combine(a: (i32, i32), b: (i32, i32), op: u8) -> (i32, i32) {
            let (va, ca) = a;
            let (vb, cb) = b;
            let v: i32;
            let c: i32;
            if op == b'&' {
                v = va & vb;
                if v == 0 {
                    if va == 0 && vb == 0 {
                        c = ca.min(cb) + 1;
                    } else if va == 0 {
                        // 0 & 1
                        c = ca.min(1);
                    } else {
                        // 1 & 0
                        c = cb.min(1);
                    }
                } else {
                    // 1 & 1
                    c = ca.min(cb);
                }
            } else {
                // '|'
                v = va | vb;
                if v == 0 {
                    // 0 | 0 -> flip one operand to 1
                    c = ca.min(cb);
                } else if va == 0 {
                    // 0 | 1 -> flip b to 0 or switch to '&'
                    c = cb.min(1);
                } else if vb == 0 {
                    // 1 | 0 -> flip a to 0 or switch to '&'
                    c = ca.min(1);
                } else {
                    // 1 | 1 -> both must become 0, or flip one and switch to '&'
                    c = ca.min(cb) + 1;
                }
            }
            (v, c)
        }

        fn eval_seq(values: &[(i32, i32)], ops: &[u8]) -> (i32, i32) {
            let mut result = values[0];
            for (i, op) in ops.iter().enumerate() {
                result = combine(result, values[i + 1], *op);
            }
            result
        }

        // item: kind 0 -> operator byte; kind 1 -> (value, cost)
        #[derive(Clone, Copy)]
        enum Item {
            Op(u8),
            Val(i32, i32),
        }

        let mut stack: Vec<Item> = Vec::new();
        for &ch in expression.as_bytes() {
            match ch {
                b'(' => stack.push(Item::Op(b'(')),
                b'&' | b'|' => stack.push(Item::Op(ch)),
                b'0' | b'1' => stack.push(Item::Val((ch - b'0') as i32, 1)),
                _ => {
                    // ')'
                    let mut values: Vec<(i32, i32)> = Vec::new();
                    let mut ops: Vec<u8> = Vec::new();
                    while let Some(top) = stack.last() {
                        if let Item::Op(b'(') = top {
                            break;
                        }
                        match stack.pop().unwrap() {
                            Item::Op(o) => ops.push(o),
                            Item::Val(v, c) => values.push((v, c)),
                        }
                    }
                    stack.pop(); // remove '('
                    values.reverse();
                    ops.reverse();
                    let res = eval_seq(&values, &ops);
                    stack.push(Item::Val(res.0, res.1));
                }
            }
        }
        let mut values: Vec<(i32, i32)> = Vec::new();
        let mut ops: Vec<u8> = Vec::new();
        for it in stack {
            match it {
                Item::Op(o) => ops.push(o),
                Item::Val(v, c) => values.push((v, c)),
            }
        }
        eval_seq(&values, &ops).1
    }
}
