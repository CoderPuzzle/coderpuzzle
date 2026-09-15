# Find Books with Polarized Opinions

## Description

Table: `Books`

| Column Name | Type    |
| ----------- | ------- |
| book_id     | int     |
| title       | varchar |
| author      | varchar |
| genre       | varchar |
| pages       | int     |

`book_id` is the unique ID for this table. Each row holds the catalog
information for one book, including its genre and page count.

Table: `ReadingSessions`

| Column Name    | Type    |
| -------------- | ------- |
| session_id     | int     |
| book_id        | int     |
| reader_name    | varchar |
| pages_read     | int     |
| session_rating | int     |

`session_id` is the unique ID for this table. Each row represents a
reading session in which someone read a portion of a book;
`session_rating` is on a scale of 1 to 5.

A book has **polarized opinions** when different readers disagree
sharply about it: it has received at least one rating of 4 or higher and
at least one rating of 2 or lower. Call a rating _extreme_ when it is 2
or lower or 4 or higher — every other rating sits in the middle.

Consider only books with at least 5 reading sessions. For such a book,
report:

- `rating_spread`, its highest rating minus its lowest rating.
- `polarization_score`, the number of extreme ratings it received
  divided by its total number of sessions.

Keep only books whose polarization score is at least 0.6 — at least 60%
extreme ratings. A book qualifies on its exact ratio; scores are rounded
to two decimal places only as they are reported.

Return the result table ordered by polarization score in descending
order, then by title in descending order.

Each testcase supplies its own `dataset`: its statements fill both
tables before your query runs. The result format is shown in the
following example.

### Example 1

```text
Input: the Books and ReadingSessions tables from the dataset below.
Books rows:
book_id | title                | author      | genre     | pages
1       | The Glass Harbor     | M. Ellison  | Fiction   | 180
2       | A Court of Sparrows  | H. Marlowe  | Fiction   | 281
3       | Nineteen Moons       | T. Varga    | Dystopian | 328
4       | Letters to Winterport| J. Calloway | Romance   | 432
5       | The Lantern House    | S. Devlin   | Fiction   | 277
ReadingSessions rows:
session_id | book_id | reader_name | pages_read | session_rating
1          | 1       | Anya        | 50         | 5
2          | 1       | Bram        | 60         | 1
3          | 1       | Cleo        | 40         | 4
4          | 1       | Dario       | 30         | 2
5          | 1       | Esme        | 45         | 5
6          | 2       | Farid       | 80         | 4
7          | 2       | Gwen        | 70         | 4
8          | 2       | Hugo        | 90         | 5
9          | 2       | Iris        | 60         | 4
10         | 2       | Jonas       | 75         | 4
11         | 3       | Katya       | 100        | 2
12         | 3       | Lior        | 120        | 1
13         | 3       | Mira        | 80         | 2
14         | 3       | Noor        | 90         | 1
15         | 3       | Odile       | 110        | 4
16         | 3       | Piero       | 95         | 5
17         | 4       | Quinlan     | 150        | 3
18         | 4       | Rosa        | 140        | 3
19         | 5       | Stellan     | 80         | 1
20         | 5       | Tamara      | 70         | 2
Output:
book_id | title            | author      | genre     | pages | rating_spread | polarization_score
1       | The Glass Harbor | M. Ellison  | Fiction   | 180   | 4             | 1.00
3       | Nineteen Moons   | T. Varga    | Dystopian | 328   | 4             | 1.00
Explanation: The Glass Harbor (book_id = 1) has 5 reading sessions with
ratings 5, 1, 4, 2, 5. It has ratings of 4 or higher (5, 4, 5) and
ratings of 2 or lower (1, 2), so its opinions are polarized. Its spread
is 5 - 1 = 4, all five ratings are extreme, and the score 5/5 rounds to
1.00, which clears the 0.6 bar. Nineteen Moons (book_id = 3) has 6
sessions with ratings 2, 1, 2, 1, 4, 5: both sides are present, the
spread is 4, every rating is extreme, and 6/6 also lands on 1.00. The two
qualifiers tie on score, so title order descending puts "The Glass
Harbor" ahead of "Nineteen Moons". Not included: A Court of Sparrows
(book_id = 2) has only ratings of 4 or 5, so it lacks any low rating;
Letters to Winterport (book_id = 4) and The Lantern House (book_id = 5)
have only 2 sessions each, under the floor of 5.
```

Answer with one `SELECT` whose output columns are `book_id`, `title`,
`author`, `genre`, `pages`, `rating_spread` and `polarization_score`,
in that order.
