SELECT
  i.invoice_id,
  c.customer_name,
  i.price,
  COALESCE(cnt.contacts_cnt, 0) AS contacts_cnt,
  COALESCE(trc.trusted_contacts_cnt, 0) AS trusted_contacts_cnt
FROM
  Invoices i
  JOIN Customers c ON c.customer_id = i.user_id
  LEFT JOIN (
    SELECT
      user_id,
      COUNT(*) AS contacts_cnt
    FROM
      Contacts
    GROUP BY
      user_id
  ) cnt ON cnt.user_id = i.user_id
  LEFT JOIN (
    SELECT
      co.user_id,
      COUNT(*) AS trusted_contacts_cnt
    FROM
      Contacts co
    WHERE
      EXISTS (
        SELECT
          1
        FROM
          Customers cu
        WHERE
          cu.email = co.contact_email
      )
    GROUP BY
      co.user_id
  ) trc ON trc.user_id = i.user_id
ORDER BY
  i.invoice_id