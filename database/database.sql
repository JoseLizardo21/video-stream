CREATE DATABASE videostream;
CREATE TABLE rooms(
    id INT(11) NOT NULL,
    name_room VARCHAR(22) NOT NULL
);

ALTER TABLE rooms 
    ADD PRIMARY KEY(id);

ALTER TABLE rooms
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;
