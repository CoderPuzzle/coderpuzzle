SELECT
  p.patient_id,
  p.patient_name,
  p.age,
  CAST(
    JULIANDAY(neg.first_negative) - JULIANDAY(pos.first_positive) AS INTEGER
  ) AS recovery_time
FROM
  patients p
  JOIN (
    SELECT
      patient_id,
      MIN(test_date) AS first_positive
    FROM
      covid_tests
    WHERE
      result = 'Positive'
    GROUP BY
      patient_id
  ) pos ON pos.patient_id = p.patient_id
  JOIN (
    SELECT
      t.patient_id,
      MIN(t.test_date) AS first_negative
    FROM
      covid_tests t
    WHERE
      t.result = 'Negative'
      AND t.test_date > (
        SELECT
          MIN(c.test_date)
        FROM
          covid_tests c
        WHERE
          c.patient_id = t.patient_id
          AND c.result = 'Positive'
      )
    GROUP BY
      t.patient_id
  ) neg ON neg.patient_id = p.patient_id
ORDER BY
  recovery_time ASC,
  p.patient_name ASC