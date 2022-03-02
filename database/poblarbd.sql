INSERT INTO "CATEGORIA"(nombre_categoria, descripccion_categoria)
VALUES ('Artesania', 'Artesania variada');
INSERT INTO "CATEGORIA"(nombre_categoria, descripccion_categoria)
VALUES ('Ropa niño', 'Chores,chalecos y sandalias');
INSERT INTO "CATEGORIA"(nombre_categoria, descripccion_categoria)
VALUES ('Ropa mujer', 'vestidos, chalecos o poleras y sandalias');
INSERT INTO "CATEGORIA"(nombre_categoria, descripccion_categoria)
VALUES ('Juguetes niño', 'Cartas, muñecos,pistolas de agua etc');
SELECT * FROM "CATEGORIA"


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

ALTER COLUMN contrasena_cliente type varchar(115)