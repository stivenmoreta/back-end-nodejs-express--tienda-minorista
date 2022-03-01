INSERT INTO "CATEGORIA"(nombre_categoria, descripccion_categoria)
VALUES ('Artesania', 'Artesania variada');
INSERT INTO "CATEGORIA"(nombre_categoria, descripccion_categoria)
VALUES ('Ropa niño', 'Chores,chalecos y sandalias');
INSERT INTO "CATEGORIA"(nombre_categoria, descripccion_categoria)
VALUES ('Ropa mujer', 'vestidos, chalecos o poleras y sandalias');
INSERT INTO "CATEGORIA"(nombre_categoria, descripccion_categoria)
VALUES ('Juguetes niño', 'Cartas, muñecos,pistolas de agua etc');
SELECT * FROM "CATEGORIA"


/*Corregir id cuando se vuelva a crear la bd*/
INSERT INTO "PRODUCTO"(fk_id_categoria, nombre_producto,precio_producto,stock_producto)
VALUES (1, 'Tortuga chica',3000,5);
INSERT INTO "PRODUCTO"(fk_id_categoria, nombre_producto,precio_producto,stock_producto)
VALUES (1, 'Tortuga Mediana',5000,3);
INSERT INTO "PRODUCTO"(fk_id_categoria, nombre_producto,precio_producto,stock_producto)
VALUES (1, 'Indio grande',80000,2);
INSERT INTO "PRODUCTO"(fk_id_categoria, nombre_producto,precio_producto,stock_producto)
VALUES (2, 'Sandalia talla 30',2000,5);
INSERT INTO "PRODUCTO"(fk_id_categoria, nombre_producto,precio_producto,stock_producto)
VALUES (2, 'Chaleco talla 12',5000,4);
INSERT INTO "PRODUCTO"(fk_id_categoria, nombre_producto,precio_producto,stock_producto)
VALUES (2, 'Polera',6000,4);
INSERT INTO "PRODUCTO"(fk_id_categoria, nombre_producto,precio_producto,stock_producto)
VALUES (3, 'Vestido',5000,30);
INSERT INTO "PRODUCTO"(fk_id_categoria, nombre_producto,precio_producto,stock_producto)
VALUES (3, 'Sandalias talla 38',3000,5);
INSERT INTO "PRODUCTO"(fk_id_categoria, nombre_producto,precio_producto,stock_producto)
VALUES (3, 'Chaleco talla 20',12000,4);
INSERT INTO "PRODUCTO"(fk_id_categoria, nombre_producto,precio_producto,stock_producto)
VALUES (4, 'UNO',2000,10);
INSERT INTO "PRODUCTO"(fk_id_categoria, nombre_producto,precio_producto,stock_producto)
VALUES (4, 'TOY STORY POP',5000,6);
INSERT INTO "PRODUCTO"(fk_id_categoria, nombre_producto,precio_producto,stock_producto)
VALUES (4, 'Laser',1000,10);
SELECT * FROM "PRODUCTO"

INSERT INTO "CLIENTE"(rut_cliente,
					  digito_verificador_cliente,
					  nombre_cliente,
					  apellido_cliente,
					  correo_electronico_cliente,
					  numero_tel_cel_cliente,
					  contrasena_cliente,
					  direccion_cliente)
VALUES ('15436852','5','stiven','moreta','stiven@gmail.com','984441121','123','club hipico 500');
INSERT INTO "CLIENTE"(rut_cliente,
					  digito_verificador_cliente,
					  nombre_cliente,
					  apellido_cliente,
					  correo_electronico_cliente,
					  numero_tel_cel_cliente,
					  contrasena_cliente,
					  direccion_cliente)
VALUES ('12345678','9','marcelo','salaz','salaz@gmail.com','935511331','123','club hipico 120')
SELECT * FROM "CLIENTE"

INSERT INTO "FACTURA"(fk_id_cliente,fecha)
VALUES (1,NOW());
INSERT INTO "FACTURA"(fk_id_cliente,fecha)
VALUES (2,NOW());
SELECT * FROM "FACTURA"

INSERT INTO "DETALLE"(num_detalle,id_factura,fk_id_producto,cantidad,precio)
VALUES (1,1,1,2,3000);
INSERT INTO "DETALLE"(num_detalle,id_factura,fk_id_producto,cantidad,precio)
VALUES (2,1,2,1,5000);
INSERT INTO "DETALLE"(num_detalle,id_factura,fk_id_producto,cantidad,precio)
VALUES (1,2,3,1,80000);
INSERT INTO "DETALLE"(num_detalle,id_factura,fk_id_producto,cantidad,precio)
VALUES (2,2,10,1,2000);
SELECT * FROM "DETALLE"