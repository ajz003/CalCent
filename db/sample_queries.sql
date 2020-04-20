CREATE TABLE users (
	user_id SERIAL PRIMARY KEY,
	username VARCHAR (50) UNIQUE NOT NULL,
	password VARCHAR (50) NOT NULL,
	email VARCHAR (355) UNIQUE NOT NULL,
	created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	last_login TIMESTAMP
)

CREATE TABLE items (
	item_id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users(user_id),
	name VARCHAR (50) NOT NULL,
	price INTEGER,
	calories INTEGER NOT NULL,
	calories_price_ratio GENERATED ALWAYS AS (CAST (calories as DOUBLE PRECISION) / price) STORED,
	created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)

ALTER TABLE users
ALTER COLUMN created_on SET DEFAULT CURRENT_TIMESTAMP

ALTER TABLE items
	ADD COLUMN calories_price_ratio DOUBLE PRECISION
		GENERATED ALWAYS AS (CAST (calories as DOUBLE PRECISION) / price) STORED;

INSERT INTO users (username, password, email)
VALUES
	('ajz003', 'password', 'email@email.com')
	
INSERT INTO items(user_id, name, price, calories)
	VALUES(2, 'Double Quarter Pounder with Cheese Meal', 1000, 1260)
	
INSERT INTO items(user_id, name, price, calories)
	VALUES(2, 'Big Mac Combo Meal', 800, 1080)
	
SELECT
	items.name,
	items.price,
	items.calories
FROM users
INNER JOIN items ON items.user_id = users.user_id

select CAST (calories as DOUBLE PRECISION)/price
from items

SELECT version();