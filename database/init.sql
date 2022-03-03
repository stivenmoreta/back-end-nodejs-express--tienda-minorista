-- object: public."USUARIO" | type: TABLE --
-- DROP TABLE IF EXISTS public."USUARIO" CASCADE;
CREATE TABLE public."USUARIO" (
	id_usuario serial NOT NULL,
	rut_usuario varchar(8),
	digito_verificador_usuario varchar(1),
	p_nombre_usuario varchar(30),
	s_nombre_usuario varchar(30),
	apellido_p_usuario varchar(30),
	apellido_m_usuario varchar(30),
	correo_electronico_usuario varchar(100),
	numero_tel_cel_usuario varchar(15),
	contrasena_usuario varchar(128),
	nick_usuario varchar(50),
	CONSTRAINT "Usuario_pk" PRIMARY KEY (id_usuario)
);
-- ddl-end --
COMMENT ON COLUMN public."USUARIO".id_usuario IS E'Identificador unico de usuario';
-- ddl-end --
ALTER TABLE public."USUARIO" OWNER TO postgres;
-- ddl-end --

-- object: public."ROL" | type: TABLE --
-- DROP TABLE IF EXISTS public."ROL" CASCADE;
CREATE TABLE public."ROL" (
	id_rol serial NOT NULL,
	nombre_rol varchar(40),
	CONSTRAINT rol_pk PRIMARY KEY (id_rol)
);
-- ddl-end --
ALTER TABLE public."ROL" OWNER TO postgres;
-- ddl-end --

-- object: public."USU_X_ROL" | type: TABLE --
-- DROP TABLE IF EXISTS public."USU_X_ROL" CASCADE;
CREATE TABLE public."USU_X_ROL" (
	fk_id_usuario integer,
	fk_id_rol integer

);
-- ddl-end --
ALTER TABLE public."USU_X_ROL" OWNER TO postgres;
-- ddl-end --

-- object: public."CATEGORIA" | type: TABLE --
-- DROP TABLE IF EXISTS public."CATEGORIA" CASCADE;
CREATE TABLE public."CATEGORIA" (
	id_categoria serial NOT NULL,
	nombre_categoria varchar(150),
	descripccion_categoria varchar(400),
	CONSTRAINT categoria_pk PRIMARY KEY (id_categoria)
);
-- ddl-end --
ALTER TABLE public."CATEGORIA" OWNER TO postgres;
-- ddl-end --

-- object: public."PRODUCTO" | type: TABLE --
-- DROP TABLE IF EXISTS public."PRODUCTO" CASCADE;
CREATE TABLE public."PRODUCTO" (
	id_producto serial NOT NULL,
	fk_id_categoria integer,
	nombre_producto varchar(100),
	precio_producto integer,
	stock_producto integer,
	eliminado boolean,
	CONSTRAINT producto_pk PRIMARY KEY (id_producto)
);
-- ddl-end --
ALTER TABLE public."PRODUCTO" OWNER TO postgres;
-- ddl-end --

-- object: public."DETALLE" | type: TABLE --
-- DROP TABLE IF EXISTS public."DETALLE" CASCADE;
CREATE TABLE public."DETALLE" (
	num_detalle integer NOT NULL,
	fk_num_boleta integer NOT NULL,
	fk_id_producto integer,
	cantidad integer,
	precio integer,
	CONSTRAINT detalle_pk PRIMARY KEY (num_detalle,fk_num_boleta)
);
-- ddl-end --
COMMENT ON COLUMN public."DETALLE".cantidad IS E'cantidad del producto que se desea comprar';
-- ddl-end --
COMMENT ON COLUMN public."DETALLE".precio IS E'precio actual del producto, si varia se puede cambiar aca';
-- ddl-end --
ALTER TABLE public."DETALLE" OWNER TO postgres;
-- ddl-end --

-- object: public."BOLETA" | type: TABLE --
-- DROP TABLE IF EXISTS public."BOLETA" CASCADE;
CREATE TABLE public."BOLETA" (
	num_boleta serial NOT NULL,
	fk_id_cliente integer,
	fecha date,
	CONSTRAINT factura_pk PRIMARY KEY (num_boleta)
);
-- ddl-end --
ALTER TABLE public."BOLETA" OWNER TO postgres;
-- ddl-end --

-- object: public."CLIENTE" | type: TABLE --
-- DROP TABLE IF EXISTS public."CLIENTE" CASCADE;
CREATE TABLE public."CLIENTE" (
	id_cliente serial NOT NULL,
	rut_cliente varchar(8),
	digito_verificador_cliente varchar(1),
	nombre_cliente varchar(100),
	apellido_cliente varchar(100),
	correo_electronico_cliente varchar(100),
	numero_tel_cel_cliente varchar(15),
	contrasena_cliente varchar(115),
	direccion_cliente varchar(100),
	CONSTRAINT "CLIENTE_pk" PRIMARY KEY (id_cliente)
);
-- ddl-end --
ALTER TABLE public."CLIENTE" OWNER TO postgres;
-- ddl-end --

-- object: fk_id_usuario | type: CONSTRAINT --
-- ALTER TABLE public."USU_X_ROL" DROP CONSTRAINT IF EXISTS fk_id_usuario CASCADE;
ALTER TABLE public."USU_X_ROL" ADD CONSTRAINT fk_id_usuario FOREIGN KEY (fk_id_usuario)
REFERENCES public."USUARIO" (id_usuario) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_id_rol | type: CONSTRAINT --
-- ALTER TABLE public."USU_X_ROL" DROP CONSTRAINT IF EXISTS fk_id_rol CASCADE;
ALTER TABLE public."USU_X_ROL" ADD CONSTRAINT fk_id_rol FOREIGN KEY (fk_id_rol)
REFERENCES public."ROL" (id_rol) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_id_categoria | type: CONSTRAINT --
-- ALTER TABLE public."PRODUCTO" DROP CONSTRAINT IF EXISTS fk_id_categoria CASCADE;
ALTER TABLE public."PRODUCTO" ADD CONSTRAINT fk_id_categoria FOREIGN KEY (fk_id_categoria)
REFERENCES public."CATEGORIA" (id_categoria) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_id_producto | type: CONSTRAINT --
-- ALTER TABLE public."DETALLE" DROP CONSTRAINT IF EXISTS fk_id_producto CASCADE;
ALTER TABLE public."DETALLE" ADD CONSTRAINT fk_id_producto FOREIGN KEY (fk_id_producto)
REFERENCES public."PRODUCTO" (id_producto) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_id_factura_num_factura | type: CONSTRAINT --
-- ALTER TABLE public."DETALLE" DROP CONSTRAINT IF EXISTS fk_id_factura_num_factura CASCADE;
ALTER TABLE public."DETALLE" ADD CONSTRAINT fk_id_factura_num_factura FOREIGN KEY (fk_num_boleta)
REFERENCES public."BOLETA" (num_boleta) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_id_cliente | type: CONSTRAINT --
-- ALTER TABLE public."BOLETA" DROP CONSTRAINT IF EXISTS fk_id_cliente CASCADE;
ALTER TABLE public."BOLETA" ADD CONSTRAINT fk_id_cliente FOREIGN KEY (fk_id_cliente)
REFERENCES public."CLIENTE" (id_cliente) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --


