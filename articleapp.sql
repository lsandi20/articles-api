--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Debian 15.1-1.pgdg110+1)
-- Dumped by pg_dump version 15.1 (Debian 15.1-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: ArticleCategories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ArticleCategories" (
    id uuid NOT NULL,
    title character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."ArticleCategories" OWNER TO postgres;

--
-- Name: Articles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Articles" (
    id uuid NOT NULL,
    title character varying(255) NOT NULL,
    short_description character varying(255),
    description text,
    category_id uuid NOT NULL,
    is_visible boolean DEFAULT true,
    image character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Articles" OWNER TO postgres;

--
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO postgres;

--
-- Name: Users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users" (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    phone character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    secret uuid
);


ALTER TABLE public."Users" OWNER TO postgres;

--
-- Data for Name: ArticleCategories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ArticleCategories" (id, title, "createdAt", "updatedAt") FROM stdin;
3b69e667-0ffd-4cd1-8b86-aa1b1e5ea22a	Economy	2022-12-08 04:29:43.508+00	2022-12-08 04:29:43.508+00
4a89c864-eda8-4270-8a0e-af8409601b56	Sport	2022-12-07 16:54:32.267+00	2022-12-07 16:54:32.267+00
\.


--
-- Data for Name: Articles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Articles" (id, title, short_description, description, category_id, is_visible, image, "createdAt", "updatedAt") FROM stdin;
7c59426d-4b70-4d0a-82af-31480d34f137	basketball Player return back	basketball player return back after 12 year	<p>Football player return back after 12 year and play again </p>	4a89c864-eda8-4270-8a0e-af8409601b56	t	/images/1670454734555rect31.png	2022-12-07 23:12:14.557+00	2022-12-07 23:12:14.557+00
49ae5592-25e9-4064-86d3-87f990fa5360	Article API Released	article api released after development	<p>article api released after development on software division </p>	4a89c864-eda8-4270-8a0e-af8409601b56	t	\N	2022-12-08 04:44:10.201+00	2022-12-08 04:44:10.201+00
f2ebe3ff-43ae-4367-a3a1-a0b071cc3d9a	an Article API Released	article api released after development	<p>article api released after development on software division </p>	4a89c864-eda8-4270-8a0e-af8409601b56	t	/images/1670476508004rect31.png	2022-12-08 05:15:08.01+00	2022-12-08 05:15:08.01+00
619391ec-2328-437c-b530-49106891bcb3	aaewqdafcafa	fasfrafawrwa	<p><u>afsafsafasvaa</u></p>	4a89c864-eda8-4270-8a0e-af8409601b56	t	/images/1670569158861rect31.png	2022-12-09 06:59:18.862+00	2022-12-09 06:59:18.862+00
abc5a6bc-824f-408e-80fb-0c4040ee8204	adsacavad	dsacacav	<p>sadadasd</p>	3b69e667-0ffd-4cd1-8b86-aa1b1e5ea22a	t	\N	2022-12-09 07:00:20.946+00	2022-12-09 07:00:20.946+00
249128b6-d15d-47c5-9839-bb299bd56cf2	adsacavadweafaf	dsacacav	<p>sadadasd</p>	3b69e667-0ffd-4cd1-8b86-aa1b1e5ea22a	t	\N	2022-12-09 07:00:38.155+00	2022-12-09 07:00:38.155+00
9a65bc0e-9715-4fe4-a953-debda0e939c4	adsacavadweafafqwqwqr	dsacacav	<p>sadadasd</p>	3b69e667-0ffd-4cd1-8b86-aa1b1e5ea22a	f	\N	2022-12-09 07:09:16.509+00	2022-12-09 07:09:16.509+00
2c643bc8-adca-4412-be31-905ef4667177	Hidden Article	dsacacav	<p>sadadasd</p>	3b69e667-0ffd-4cd1-8b86-aa1b1e5ea22a	f	/images/1670569795398leaves-ga4e0bb05b_1280.png	2022-12-09 07:09:55.41+00	2022-12-09 07:09:55.41+00
feb5f979-2529-4736-bd4b-b6a5e5884687	Football Player return back	Football player return back after 12 year	<p>Football player return back after 12 year and play again </p>	4a89c864-eda8-4270-8a0e-af8409601b56	f	/images/1670453879139rect31.png	2022-12-07 22:57:59.147+00	2022-12-07 22:57:59.147+00
8e59980d-5707-48b3-8c2f-faffaaeaeaa9	afsafafwaf	sfaf	<p>aadfsafa</p>	3b69e667-0ffd-4cd1-8b86-aa1b1e5ea22a	f	\N	2022-12-09 07:19:15.23+00	2022-12-09 07:19:15.23+00
9e0aa5a2-8762-487c-9222-7aecc29bf567	qwerty	haeheahaeh	<p>awfwageaheaha</p>	3b69e667-0ffd-4cd1-8b86-aa1b1e5ea22a	f	\N	2022-12-09 07:19:35.915+00	2022-12-09 07:19:35.915+00
e93d0759-813c-41a0-8b17-b1a77fb158c5	aqqwqegaeeageat	gagafearar	<p>eatataa</p>	3b69e667-0ffd-4cd1-8b86-aa1b1e5ea22a	t	\N	2022-12-09 07:19:59.866+00	2022-12-09 07:19:59.866+00
b96c073b-3205-4ca4-ad81-bb2a761b7608	tes auth articlea	fsafasfavav	<p>sdafaegfava</p>	3b69e667-0ffd-4cd1-8b86-aa1b1e5ea22a	t	\N	2022-12-09 09:34:42.435+00	2022-12-09 09:34:42.435+00
\.


--
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SequelizeMeta" (name) FROM stdin;
20221207075720-create-user.js
20221207162238-create-article-category.js
20221207215126-create-article.js
20221207233443-add-secret-to-user.js
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Users" (id, name, email, password, phone, "createdAt", "updatedAt", secret) FROM stdin;
ea223238-f405-4935-8430-cebbdad2d546	Rifky Wijaksana	rifky@sahaware.co.id	$2b$10$LTgKoLKrNl3unzQaINnoTOVsq72UZu224xj2X9EhNnrt/eejb0pG.	08213465789	2022-12-07 16:38:04.965+00	2022-12-07 23:47:14.336+00	c1e3f1ec-2d8c-4a3c-96bb-fc12d4c5a2f6
fc884b03-70a2-42de-9a71-0ff7062fa415	Budi	budi@email.com	$2b$10$AEuMDtn0nhOUkuJFmcqDO.eomz2TdrZ6lUGMOpV/tz6PB9iRyfejK	0832131321	2022-12-08 04:01:56.436+00	2022-12-08 04:01:56.436+00	6106ffd3-aed1-4d49-b0c1-febe002d3de0
b6d6ea45-fefc-48e5-8a74-fad2ecd997f3	WijaksanaF	wijaksanaF@sahaware.co.id	$2b$10$DnD0WEFdXeNjfUOa6VkHrOKsHecnD5AqIg/j6j8YDIyRkTAjrpAAu	\N	2022-12-09 09:48:09.79+00	2022-12-09 09:48:09.79+00	ff6d421b-c4ff-4cff-806a-fc50a2f70b88
dd427d42-9f74-4b46-9526-8756c4eaac38	tesuser	tes@email.com	$2b$10$ko6B/tzuxKI20nCRvZRLtONmd8qCy/PYoWmvzA7ohxsgFMhvrCCmC	\N	2022-12-09 09:52:27.666+00	2022-12-09 09:52:27.666+00	eb38bf27-3170-430f-b623-69f97227acd7
\.


--
-- Name: ArticleCategories ArticleCategories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ArticleCategories"
    ADD CONSTRAINT "ArticleCategories_pkey" PRIMARY KEY (id);


--
-- Name: ArticleCategories ArticleCategories_title_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ArticleCategories"
    ADD CONSTRAINT "ArticleCategories_title_key" UNIQUE (title);


--
-- Name: Articles Articles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Articles"
    ADD CONSTRAINT "Articles_pkey" PRIMARY KEY (id);


--
-- Name: Articles Articles_title_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Articles"
    ADD CONSTRAINT "Articles_title_key" UNIQUE (title);


--
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: Users Users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key" UNIQUE (email);


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: Articles Articles_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Articles"
    ADD CONSTRAINT "Articles_category_id_fkey" FOREIGN KEY (category_id) REFERENCES public."ArticleCategories"(id);


--
-- PostgreSQL database dump complete
--

