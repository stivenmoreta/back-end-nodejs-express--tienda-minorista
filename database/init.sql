-- Database generated with pgModeler (PostgreSQL Database Modeler).
-- pgModeler version: 0.9.4
-- PostgreSQL version: 10.0
-- Project Site: pgmodeler.io
-- Model Author: ---




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
	CONSTRAINT producto_pk PRIMARY KEY (id_producto)
);
-- ddl-end --
ALTER TABLE public."PRODUCTO" OWNER TO postgres;
-- ddl-end --

-- object: public."DETALLE" | type: TABLE --
-- DROP TABLE IF EXISTS public."DETALLE" CASCADE;
CREATE TABLE public."DETALLE" (
	num_detalle integer NOT NULL,
	id_factura integer NOT NULL,
	fk_id_producto integer,
	cantidad integer,
	precio integer,
	CONSTRAINT detalle_pk PRIMARY KEY (num_detalle,id_factura)
);
-- ddl-end --
COMMENT ON COLUMN public."DETALLE".cantidad IS E'cantidad del producto que se desea comprar';
-- ddl-end --
COMMENT ON COLUMN public."DETALLE".precio IS E'precio actual del producto, si varia se puede cambiar aca';
-- ddl-end --
ALTER TABLE public."DETALLE" OWNER TO postgres;
-- ddl-end --

-- object: public."FACTURA" | type: TABLE --
-- DROP TABLE IF EXISTS public."FACTURA" CASCADE;
CREATE TABLE public."FACTURA" (
	num_factura serial NOT NULL,
	fk_id_cliente integer,
	fecha date,
	CONSTRAINT factura_pk PRIMARY KEY (num_factura)
);
-- ddl-end --
ALTER TABLE public."FACTURA" OWNER TO postgres;
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

-- object: public."PROVEEDOR" | type: TABLE --
-- DROP TABLE IF EXISTS public."PROVEEDOR" CASCADE;
CREATE TABLE public."PROVEEDOR" (
	id_proveedor serial NOT NULL,
	nombre_proveedor varchar(200),
	direccion_proveedor varchar(50),
	CONSTRAINT "PROVEEDOR_pk" PRIMARY KEY (id_proveedor)
);
-- ddl-end --
ALTER TABLE public."PROVEEDOR" OWNER TO postgres;
-- ddl-end --

-- object: public."ORDEN_COMPRA" | type: TABLE --
-- DROP TABLE IF EXISTS public."ORDEN_COMPRA" CASCADE;
CREATE TABLE public."ORDEN_COMPRA" (
	num_orden_compra serial NOT NULL,
	fk_id_usuario integer,
	fk_id_proveedor integer,
	fecha date,
	estado_orden_compra boolean,
	CONSTRAINT "ORDEN_COMPRA_pk" PRIMARY KEY (num_orden_compra)
);
-- ddl-end --
COMMENT ON COLUMN public."ORDEN_COMPRA".estado_orden_compra IS E'true si ya se realizo la compra, false si la compra aun no se realiza';
-- ddl-end --
ALTER TABLE public."ORDEN_COMPRA" OWNER TO postgres;
-- ddl-end --

-- object: public."DETALLE_ORDEN_COMPRA" | type: TABLE --
-- DROP TABLE IF EXISTS public."DETALLE_ORDEN_COMPRA" CASCADE;
CREATE TABLE public."DETALLE_ORDEN_COMPRA" (
	num_detalle_orden_compra integer NOT NULL,
	id_orden_compra integer NOT NULL,
	fk_id_producto_oc integer,
	cantidad_producto_oc integer,
	precio_producto_oc integer,
	CONSTRAINT "DETALLE_ORDEN_COMPRA_pk" PRIMARY KEY (num_detalle_orden_compra,id_orden_compra)
);
-- ddl-end --
COMMENT ON COLUMN public."DETALLE_ORDEN_COMPRA".id_orden_compra IS E'fk de el num de orden de compra';
-- ddl-end --
ALTER TABLE public."DETALLE_ORDEN_COMPRA" OWNER TO postgres;
-- ddl-end --

-- object: public."PRODUCTO_ORDEN_COMPRA" | type: TABLE --
-- DROP TABLE IF EXISTS public."PRODUCTO_ORDEN_COMPRA" CASCADE;
CREATE TABLE public."PRODUCTO_ORDEN_COMPRA" (
	id_producto_oc serial NOT NULL,
	fk_id_categoria_oc integer,
	nombre_producto_oc varchar(200),
	CONSTRAINT "PRODUCTO_ORDEN_COMPRA_pk" PRIMARY KEY (id_producto_oc)
);
-- ddl-end --
ALTER TABLE public."PRODUCTO_ORDEN_COMPRA" OWNER TO postgres;
-- ddl-end --

-- object: public."CATEGORIA_ORDEN_COMPRA" | type: TABLE --
-- DROP TABLE IF EXISTS public."CATEGORIA_ORDEN_COMPRA" CASCADE;
CREATE TABLE public."CATEGORIA_ORDEN_COMPRA" (
	id_categoria_oc serial NOT NULL,
	nombre_categoria_oc varchar(100),
	descripccion_categoria_oc varchar(200),
	CONSTRAINT "CATEGORIA_ORDEN_COMPRA_pk" PRIMARY KEY (id_categoria_oc)
);
-- ddl-end --
ALTER TABLE public."CATEGORIA_ORDEN_COMPRA" OWNER TO postgres;
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
ALTER TABLE public."DETALLE" ADD CONSTRAINT fk_id_factura_num_factura FOREIGN KEY (id_factura)
REFERENCES public."FACTURA" (num_factura) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_id_cliente | type: CONSTRAINT --
-- ALTER TABLE public."FACTURA" DROP CONSTRAINT IF EXISTS fk_id_cliente CASCADE;
ALTER TABLE public."FACTURA" ADD CONSTRAINT fk_id_cliente FOREIGN KEY (fk_id_cliente)
REFERENCES public."CLIENTE" (id_cliente) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_id_usuario_ | type: CONSTRAINT --
-- ALTER TABLE public."ORDEN_COMPRA" DROP CONSTRAINT IF EXISTS fk_id_usuario_ CASCADE;
ALTER TABLE public."ORDEN_COMPRA" ADD CONSTRAINT fk_id_usuario_ FOREIGN KEY (fk_id_usuario)
REFERENCES public."USUARIO" (id_usuario) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_id_proveedor | type: CONSTRAINT --
-- ALTER TABLE public."ORDEN_COMPRA" DROP CONSTRAINT IF EXISTS fk_id_proveedor CASCADE;
ALTER TABLE public."ORDEN_COMPRA" ADD CONSTRAINT fk_id_proveedor FOREIGN KEY (fk_id_proveedor)
REFERENCES public."PROVEEDOR" (id_proveedor) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_id_producto_oc | type: CONSTRAINT --
-- ALTER TABLE public."DETALLE_ORDEN_COMPRA" DROP CONSTRAINT IF EXISTS fk_id_producto_oc CASCADE;
ALTER TABLE public."DETALLE_ORDEN_COMPRA" ADD CONSTRAINT fk_id_producto_oc FOREIGN KEY (fk_id_producto_oc)
REFERENCES public."PRODUCTO_ORDEN_COMPRA" (id_producto_oc) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_id_oc_num_oc | type: CONSTRAINT --
-- ALTER TABLE public."DETALLE_ORDEN_COMPRA" DROP CONSTRAINT IF EXISTS fk_id_oc_num_oc CASCADE;
ALTER TABLE public."DETALLE_ORDEN_COMPRA" ADD CONSTRAINT fk_id_oc_num_oc FOREIGN KEY (id_orden_compra)
REFERENCES public."ORDEN_COMPRA" (num_orden_compra) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_id_categoria_oc | type: CONSTRAINT --
-- ALTER TABLE public."PRODUCTO_ORDEN_COMPRA" DROP CONSTRAINT IF EXISTS fk_id_categoria_oc CASCADE;
ALTER TABLE public."PRODUCTO_ORDEN_COMPRA" ADD CONSTRAINT fk_id_categoria_oc FOREIGN KEY (fk_id_categoria_oc)
REFERENCES public."CATEGORIA_ORDEN_COMPRA" (id_categoria_oc) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --


