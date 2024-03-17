CREATE TABLE board (
    id varchar(36) PRIMARY KEY,
    name varchar(500) NOT NULL
);

CREATE TABLE task_list (
    id varchar(36) PRIMARY KEY,
    name varchar(500) NOT NULL,
    item_order integer NOT NULL,
    board_id varchar(36) REFERENCES board (id)
);

CREATE TABLE task_item (
    id varchar(36) PRIMARY KEY,
    name varchar(500) NOT NULL,
    description text,
    item_order integer NOT NULL,
    list_id varchar(36) REFERENCES task_list (id)
);
