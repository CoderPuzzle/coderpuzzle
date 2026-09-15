# Solutions — All Valid Triplets That Can Represent a Country

## Cross join across the three schools filtered by pairwise distinctness

Since `SchoolA`, `SchoolB`, and `SchoolC` are separate pools with no
foreign-key relationship between them, every candidate triplet is a
member of the cross product `SchoolA × SchoolB × SchoolC` — one row per
school picked independently. A three-way join `FROM SchoolA a, SchoolB
b, SchoolC c` enumerates exactly that cross product without any join
condition needed to connect the tables.

The eligibility rule then narrows the cross product down with a `WHERE`
clause: all three `student_id` values must differ pairwise, and all
three `student_name` values must differ pairwise. Six inequalities (id
and name for each of the three unordered pairs) capture the requirement
completely, and the projection renames each surviving row's three names
to `member_A`, `member_B`, and `member_C`.

**Complexity:** proportional to the size of the cross product of the
three schools, since every combination of one row from each table is
generated before the `WHERE` clause filters it.
