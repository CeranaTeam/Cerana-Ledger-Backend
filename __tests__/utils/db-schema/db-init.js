const init = `INSERT INTO \`user\` (\`user_id\`, \`user_first_name\`, \`user_last_name\`, \`user_email\`, \`user_how_to_know_us\`, \`user_phone_number\`, \`store_name\`,\`user_create_time\`)
VALUES (?, '魏', '可晴', 'waketodo@gmail.com', '學生交流版', '0909503617', '肥皂店','2022-06-17 09:48:18');
INSERT INTO \`type\` (\`type_id\`, \`type_name\`, \`user_id\`)
VALUES ('dUoM8j33QOoMufngHglh', '香皂', ?);

INSERT INTO \`product\` (\`product_id\`, \`user_id\`, \`type_id\`, \`product_name\`, \`product_price\`, \`product_spec\`, \`product_enable\`)
VALUES ('4wbx9iDwlxtxwuxWdxfG', ?, 'dUoM8j33QOoMufngHglh', '米糠皂', 229, '梔子花', 1),
       ('M7NCyLbo7bLK8PxqZJp8', ?, 'dUoM8j33QOoMufngHglh', '米糠皂', 249, '純米皂', 1),
       ('YhUB8k2KOsGrxn3NbCjr', ?, 'dUoM8j33QOoMufngHglh', '米糠皂', 229, '白茶樹', 1),
       ('kszyiuE1OGZkBALDlaDx', ?, 'dUoM8j33QOoMufngHglh', '米糠皂', 229, '黃香木', 1);

INSERT INTO \`discount\` (\`discount_id\`, \`user_id\`, \`discount_value\`, \`discount_name\`, \`discount_note\`)
VALUES ('7cIST5sJmrwhfmtHbhHm', ?, 20, "追蹤九折", 'none');

INSERT INTO \`staff\` (\`staff_id\`, \`user_id\`, \`staff_name\`, \`staff_phone_number\`, \`staff_email\`)
VALUES ('k7LaWj79lc7kj8Wt6Fx5', ?, '魏可晴', '0909503617', 'cathie22580@gmail.com');

INSERT INTO \`order\` (\`order_id\`, \`user_id\`, \`staff_id\`, \`order_discount\`, \`order_note\`, \`order_create_time\`, \`order_total_price\`)
VALUES ('GOI83b0EqgCcmEHOh32U', ?, 'k7LaWj79lc7kj8Wt6Fx5', 20, '110204011', '2022-07-17 09:48:18', 249);

INSERT INTO \`order_discount\` (\`order_id\`, \`discount_id\`)
VALUES ('GOI83b0EqgCcmEHOh32U', '7cIST5sJmrwhfmtHbhHm');

INSERT INTO \`order_product\` (\`order_id\`, \`product_id\`, \`op_amount\`)
VALUES ('GOI83b0EqgCcmEHOh32U', 'M7NCyLbo7bLK8PxqZJp8', 1);

INSERT INTO \`tag\` (\`tag_id\`, \`user_id\`, \`tag_name\`)
VALUES ('7UhtpM8s1WykcfGIPJkU', ?, '草莓杯杯');

INSERT INTO \`order_tag\` (\`order_id\`, \`tag_id\`)
VALUES ('GOI83b0EqgCcmEHOh32U', '7UhtpM8s1WykcfGIPJkU');

INSERT INTO \`preorder\` (\`preorder_id\`, \`user_id\`, \`preorder_contact\`, \`preorder_create_time\`, \`preorder_is_picked\`, \`preorder_note\`, \`preorder_pick_up_time\`)
VALUES ('3ExP2YKc0PkKY9BWYQs4', ?, '123', '2022-07-17 09:48:18', 0, 'none', '2022-07-17 09:48:18');

INSERT INTO \`preorder_product\` (\`preorder_id\`, \`product_id\`, \`amount\`)
VALUES ('3ExP2YKc0PkKY9BWYQs4', '4wbx9iDwlxtxwuxWdxfG', '2'),
       ('3ExP2YKc0PkKY9BWYQs4', 'M7NCyLbo7bLK8PxqZJp8', '5');`


// ? 11 個

module.exports = init