-- Database: bugs

-- DROP DATABASE bugs;

CREATE DATABASE bugs
    WITH 
    OWNER = slash
    ENCODING = 'UTF8'
    LC_COLLATE = 'C'
    LC_CTYPE = 'C'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;
	
	-- Table: public.buggy

-- DROP TABLE public.buggy;

CREATE TABLE public.buggy
(
    id integer NOT NULL DEFAULT nextval('buggy_id_seq'::regclass),
    title character varying(50) COLLATE pg_catalog."default",
    description character varying(250) COLLATE pg_catalog."default",
    CONSTRAINT buggy_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.buggy
    OWNER to postgres;
	
	
	-- Table: public.todos

-- DROP TABLE public.todos;

CREATE TABLE public.todos
(
    todo_id uuid DEFAULT uuid_generate_v4(),
    title character varying(50) COLLATE pg_catalog."default" NOT NULL,
    description character varying(200) COLLATE pg_catalog."default" NOT NULL,
    user_id integer,
    CONSTRAINT fk_usertodos FOREIGN KEY (user_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.todos
    OWNER to postgres;
	
	
	-- Table: public.users

-- DROP TABLE public.users;

CREATE TABLE public.users
(
    user_id integer NOT NULL DEFAULT nextval('users_user_id_seq'::regclass),
    username character varying(50) COLLATE pg_catalog."default" NOT NULL,
    password character varying(250) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (user_id)
)

TABLESPACE pg_default;

ALTER TABLE public.users
    OWNER to postgres;