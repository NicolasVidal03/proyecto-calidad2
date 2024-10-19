import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { CatalogoKata, Kata } from '../src/katas'; 

describe('CatalogoKata Class', () => {
    let catalogo;
    let kata1;
    let kata2;
    beforeEach(() => {
        catalogo = new CatalogoKata();
    });
    afterEach(()=>{
        catalogo=null;
    });
    describe('ordenarPorDescripcion method', () => {
        beforeEach(() => {
            kata1 = new Kata("Kata 1", "Autor 1", "Descripción A", "Fácil");
            kata2 = new Kata("Kata 2", "Autor 2", "Descripción B", "Medio");
            catalogo.agregarKata(kata1);
            catalogo.agregarKata(kata2);
        });
        afterEach(()=>{
            catalogo.eliminarKata(0);
            catalogo.eliminarKata(1);
            kata1 = null;
            kata2 = null;
        });
        it('should maintain the same order when descriptions are equal', () => { 
            kata1.setDescripcion("Zebra")
            kata2.setDescripcion("Zebra")   

            catalogo.ordenarPorDescripcion();
            const resultados = catalogo.getLista();
        
            expect(resultados).toHaveLength(2);
            expect(resultados[0]).toMatchObject({ _autor: "Autor 1", _descripcion: "Zebra" });
            expect(resultados[1]).toMatchObject({ _autor: "Autor 2", _descripcion: "Zebra" });
            expect(resultados[0]).toStrictEqual(kata1);
            expect(resultados[1]).toStrictEqual(kata2);
        });
        it('should sort correctly when descripcionA is lexicographically greater than descripcionB', () => {
            kata1.setDescripcion("Zebra")
            kata2.setDescripcion("Águila")
        
            catalogo.ordenarPorDescripcion();
            const resultados = catalogo.getLista();

            expect(resultados).toHaveLength(2);
            expect(resultados[0]).toMatchObject({ _autor: "Autor 1", _descripcion: "Zebra" });
            expect(resultados[1]).toMatchObject({ _autor: "Autor 2", _descripcion: "Águila" });
            expect(resultados[0]).toStrictEqual(kata1);
            expect(resultados[1]).toStrictEqual(kata2);
        });
        it('should sort correctly when descripcionA is lexicographically greater than descripcionB', () => {
            kata1.setDescripcion("Águila")
            kata2.setDescripcion("Zebra")
        
            catalogo.ordenarPorDescripcion();
            const resultados = catalogo.getLista();
        
            expect(resultados).toHaveLength(2);
            expect(resultados[0]).toMatchObject({ _descripcion: "Zebra", _autor: "Autor 2" });
            expect(resultados[1]).toMatchObject({ _descripcion: "Águila", _autor: "Autor 1" });
            expect(resultados[0]).toStrictEqual(kata2);
            expect(resultados[1]).toStrictEqual(kata1);
        });
    });

    describe('buscarPorAuthor method', () => {
        beforeEach(() => {
            kata1 = new Kata("Kata 1", "Autor A", "Descripción 1", "Fácil");
            kata2 = new Kata("Kata 2", "Autor B", "Descripción 2", "Medio");
        });
        afterEach(() => {
            catalogo.eliminarKata(0);
            catalogo.eliminarKata(1);
            kata1 = null;
            kata2 = null;
        });
        it('should return an empty list when the kata list is empty', () => {
            const resultados = catalogo.buscarPorAutor("Autor A");
            expect(catalogo.listaKatas.length).toBe(0); 
            expect(resultados.length).toBe(0); 
            expect(resultados).toEqual([]);
        });  
        it('should return an empty list when there are no katas with the specified author', () => {
            catalogo.agregarKata(kata2);
            const resultados = catalogo.buscarPorAutor("Autor A");
            expect(resultados).toHaveLength(0);
            expect(resultados).toEqual([]);
        });
        it('should return a list with one match when there is a kata with the specified author', () => {
            catalogo.agregarKata(kata1);
            const resultados = catalogo.buscarPorAutor("Autor A");    
            expect(resultados.length).toBe(1);
            expect(resultados).toContain(kata1);
            expect(resultados[0]).toMatchObject({ _autor: "Autor A" });
            expect(resultados[0]).toStrictEqual(kata1);
        });
    });

    describe('buscarPorEstado method', () => {
        beforeEach(() => {
            kata1 = new Kata("Kata 1", "Autor A", "Descripción 1", "Fácil");
            kata2 = new Kata("Kata 2", "Autor B", "Descripción 2", "Medio");
        });
        afterEach(() => {
            catalogo.eliminarKata(0);
            catalogo.eliminarKata(1);
            kata1 = null;
            kata2 = null;
        });
        it('should return an empty list when the list of katas is empty', () => {
            const resultado = catalogo.buscarPorEstado("Terminado");
            expect(catalogo.listaKatas.length).toBe(0); 
            expect(resultado.length).toBe(0);
            expect(resultado).toEqual([]);
        });
        it('should return an empty list when there are no katas with the searched state', () => {
            kata1.setEstado("Terminado");
            catalogo.agregarKata(kata1);
            const resultado = catalogo.buscarPorEstado("No terminado");
            expect(resultado.length).toBe(0);
            expect(resultado).toEqual([]);
        }); 
        it('should return a list with matches when there are katas with the searched state', () => {
            kata1.setEstado("Terminado");
            catalogo.agregarKata(kata1);
            const resultado = catalogo.buscarPorEstado("Terminado");
            expect(resultado.length).toBe(1);
            expect(resultado).toContain(kata1);
            expect(resultado[0]).toMatchObject({ _estado: "Terminado" });
            expect(resultado[0]).toStrictEqual(kata1);
        });
    });

    describe('buscarPorId method', () => {
        beforeEach(() => {
            kata1 = new Kata("Kata 1", "Autor A", "Descripción 1", "Fácil");
            kata2 = new Kata("Kata 2", "Autor B", "Descripción 2", "Medio");
        });
        afterEach(() => {
            catalogo.eliminarKata(0);
            catalogo.eliminarKata(1);
            kata1 = null;
            kata2 = null;
        });
        it("should return undefined when listaKatas is empty", () => {
            const result = catalogo.buscarPorId(1);
            expect(catalogo.listaKatas.length).toBe(0); 
            expect(result).toBeUndefined();
        });
        it("should return the kata with the matching ID", () => {
            kata1.setId(1);
            catalogo.listaKatas = [kata1];
            const result = catalogo.buscarPorId(1);
            expect(result).toBe(kata1);
            expect(result).toMatchObject({_descripcion: "Descripción 1",_autor: "Autor A",_id: 1}); 
        });
        it("should return undefined when no kata matches the given ID", () => {
            kata1.setId(1);
            catalogo.listaKatas = [kata1];
            const result = catalogo.buscarPorId(3);
            expect(result).toBeUndefined();
        });  
    });

    describe('mostrarCatalogoKatas method', () => {
        it('deberia mostrar mensajes concatenados cuando existen elementos en el catalogo', () => {
            const catalogo = new CatalogoKata();
            const kata1 = new Kata("Kata 1", "Belen", "Descripcion Belen", "Facil");
            const kata2 = new Kata("Kata 2", "Nico", "Descripcion Nico", "Medio");
            const kata3 = new Kata("Kata 3", "Sebas", "Descripcion Sebas", "Dificil");
            catalogo.listaKatas.push(kata1);
            catalogo.listaKatas.push(kata2);
            catalogo.listaKatas.push(kata3);

            const resultado = catalogo.mostrarCatalogoKatas();
            const expectedLength = kata1.mostrar().length + kata2.mostrar().length + kata3.mostrar().length;
            expect(resultado).toBe(kata1.mostrar() + kata2.mostrar() + kata3.mostrar());
            expect(resultado.length).toBe(expectedLength);
        });
        it('deberia mostrar vacio en caso de que no hay elementos en el catalogo', () => {
            const catalogo = new CatalogoKata(); 
            const resultado = catalogo.mostrarCatalogoKatas();
            expect(resultado).toBe("");
            expect(resultado).not.toBeNull();
            expect(resultado).not.toBeUndefined();
            expect(typeof resultado).toBe("string");
        });
    })

    describe('buscarPorDescripcion method', () => {
        it('deberia devolver un array con las katas que coinciden con la descripción buscada', () => {
            const catalogo = new CatalogoKata();
            const kata1 = new Kata("Kata 1", "Belen", "Descripcion", "Facil");
            const kata2 = new Kata("Kata 2", "Nico", "Descripcion", "Medio");
            const kata3 = new Kata("Kata 3", "Sebas", "Descripcion Sebas", "Dificil");
            catalogo.listaKatas.push(kata1);
            catalogo.listaKatas.push(kata2);
            catalogo.listaKatas.push(kata3);

            const resultado = catalogo.buscarPorDescripcion("Descripcion");
            expect(resultado.length).toBe(2);
            expect(resultado).toContain(kata1);
            expect(resultado).toContain(kata2);
            resultado.forEach(kata => {
                expect(kata.getDescripcion()).toMatch(/Descripcion/);
            });
        });
        it('deberia devolver una array con UNA kata que coincida con la descripción buscada', () => {
            const catalogo = new CatalogoKata();
            const kata1 = new Kata("Kata 1", "Belen", "Descripcion", "Facil");
            const kata2 = new Kata("Kata 2", "Nico", "Descripcion Nico", "Medio");
            const kata3 = new Kata("Kata 3", "Sebas", "Descripcion Sebas", "Dificil");
            catalogo.listaKatas.push(kata1);
            catalogo.listaKatas.push(kata2);
            catalogo.listaKatas.push(kata3);
            
            const resultado = catalogo.buscarPorDescripcion("Descripcion");
            expect(resultado.length).toBe(1);
            expect(resultado).toContain(kata1);
            expect(resultado[0].getDescripcion()).toEqual("Descripcion");
        });
        it('deberia devolver un array vacio [] cuando la descripcion no coincida con ninguna kata', () => {
            const catalogo = new CatalogoKata(); 
            const kata1 = new Kata("Kata 1", "Belen", "Descripcion Sebas", "Facil");
            const kata2 = new Kata("Kata 2", "Nico", "Descripcion Nico", "Medio");
            const kata3 = new Kata("Kata 3", "Sebas", "Descripcion Sebas", "Dificil");
            catalogo.listaKatas.push(kata1);
            catalogo.listaKatas.push(kata2);
            catalogo.listaKatas.push(kata3);
            
            const resultado = catalogo.buscarPorDescripcion("Descripcion");
            expect(resultado.length).toBe(0);
            expect(resultado).toEqual([]);
        });  
    })

    describe('Metodo ordenarPorAutor', () => {
        let nombreA;
        let nombreB;
        let nombreC;

        beforeEach(() => {
            nombreA = new Kata("Kata 1", "Angelica");
            nombreB = new Kata("Kata 2", "Bernardo");
            nombreC = new Kata("Kata 3", "Angelica")
        });

        afterEach(() => {
            nombreA = null;
            nombreB = null;
            nombreC = null;
        });

        it('nombreA es primero sobre nombreB', () => {
            catalogo.agregarKata(nombreA);
            catalogo.agregarKata(nombreB);

            catalogo.ordenarPorAutor();
            const resultado = catalogo.getLista()

            expect(resultado).toStrictEqual([nombreA, nombreB]);
            expect(resultado).toContain(nombreB);
            expect(resultado).toHaveLength(2);
            expect(resultado).not.toBeUndefined()
        });
        it('nombreA es segundo sobre nombreB', () => {
            catalogo.agregarKata(nombreB);
            catalogo.agregarKata(nombreA);

            catalogo.ordenarPorAutor();
            const resultado = catalogo.getLista()

            expect(resultado).toStrictEqual([nombreA, nombreB]);
            expect(resultado).toContain(nombreA);
            expect(resultado).toHaveLength(2);
            expect(resultado).not.toBeUndefined()
        });
        it('nombreA es igual a nombreC', () => {
            catalogo.agregarKata(nombreA);
            catalogo.agregarKata(nombreC);

            catalogo.ordenarPorAutor();
            const resultado = catalogo.getLista()

            expect(resultado).toStrictEqual([nombreA, nombreC]);
            expect(resultado).toContain(nombreC);
            expect(resultado).toHaveLength(2);
            expect(resultado).not.toBeUndefined()
        });
    });

    describe('Método clone', () => {
        let kata1;
        let kata2;
        let kata3;

        beforeEach(() => {
            kata1 = new Kata('Kata 1', 'Autor', 'Descripcion', 'Dificultad');
            kata2 = new Kata('Kata 2', 'Autor', 'Descripcion', 'Dificultad');
            kata3 = new Kata('Kata 3', 'Autor', 'Descripcion', 'Dificultad');
        });

        afterEach(() => {
            kata1 = null;
            kata2 = null;
            kata3 = null;
        });

        it('entra al ciclo for', () => {
            catalogo.agregarKata(kata1);
            catalogo.agregarKata(kata2);
            catalogo.agregarKata(kata3);

            const catalogo_nuevo = catalogo.clone();

            const resultado = catalogo_nuevo.getLista()

            expect(resultado).toStrictEqual([kata1, kata2, kata3]);
            expect(resultado).toContainEqual(kata1);
            expect(resultado).toHaveLength(3);
            expect(resultado).not.toBeUndefined()
        });
        it('no entra al ciclo for', () => {
            const catalogo_nuevo = catalogo.clone();

            const resultado = catalogo_nuevo.getLista()

            expect(resultado).toStrictEqual([]);
            expect(resultado).toHaveLength(0);
            expect(resultado).not.toBeUndefined()
        });
    });

    describe('Metodo buscarPorNombre', () => {
        let kata1;
        let kata2;
        let kata3;

        beforeEach(() => {
            kata1 = new Kata('Kata 1', 'Autor', 'Descripcion', 'Dificultad');
            kata2 = new Kata('Kata 2', 'Autor', 'Descripcion', 'Dificultad');
            kata3 = new Kata('Kata 3', 'Autor', 'Descripcion', 'Dificultad');
        });

        afterEach(() => {
            kata1 = null;
            kata2 = null;
            kata3 = null;
        });

        it('la lista de katas se encuentra con elementos y encuentra coincidencias', () => {
            catalogo.agregarKata(kata1);
            catalogo.agregarKata(kata2);
            catalogo.agregarKata(kata3);

            const resultado = catalogo.buscarPorNombre('Kata 3')[0]

            expect(resultado).toEqual(kata3);
            expect(resultado).toHaveProperty('_nombre', 'Kata 3')
            expect(resultado).toBeInstanceOf(Kata)
            expect(resultado).toBeTruthy();
            expect(typeof resultado).toEqual('object')
            expect(resultado).not.toBeUndefined()
        });
        it('la lista de katas se encuentra con elementos y no encuentra ninguna coincidencia', () => {
            catalogo.agregarKata(kata1);
            catalogo.agregarKata(kata2);
            catalogo.agregarKata(kata3);

            const resultado = catalogo.buscarPorNombre('Kata 6')

            expect(resultado).toBeTruthy();
            expect(resultado).toEqual([]);
            expect(resultado).not.toEqual(kata1);
            expect(resultado).toHaveLength(0);
            expect(resultado[0]).toBeUndefined();
            expect(resultado).not.toBeUndefined();
        });
        it('la lista de katas se encuentra vacía', () => {
            const resultado = catalogo.buscarPorNombre('')

            expect(resultado).toBeTruthy();
            expect(resultado).toEqual([]);
            expect(resultado).toHaveLength(0);
            expect(resultado[0]).toBeUndefined();
            expect(resultado).not.toBeUndefined();
        });
    });
    describe('Método mostrarPuntuacion', () => {
        it('deberia retornar la puntuacion ingresada previamente', () => {
            const kata = new Kata();
            kata.setPuntuacion(5); 
            
            const resultado = kata.mostrarPuntuacion();
            expect(resultado).toBe(5); 
            expect(typeof resultado).toBe("number");

        });
        it('deberia retornar "Sin calificar" en caso de que no se le asigne ninguna puntuacion(osea puntuacion sea igual a -1)', () => {
            const kata = new Kata(); 
            
            expect(kata.getPuntuacion()).toBe(-1);
            expect(typeof kata.getPuntuacion()).toBe("number");
            expect(kata.mostrarPuntuacion()).toBe("Sin calificar");
            expect(typeof kata.mostrarPuntuacion()).toBe("string");
            
        });
    });
    describe('Metodo ordenarPorNombre', () => {
    
        it('deberia ordenar correctamente en orden ascendente por nombre', () => {
            const kata1 = new Kata("Kata A", "Autor 1", "Descripcion 1", "Facil");
            const kata2 = new Kata("Kata B", "Autor 2", "Descripcion 2", "Medio");
            const kata3 = new Kata("Kata C", "Autor 3", "Descripcion 3", "Dificil");
            const kata4 = new Kata("Kata D", "Autor 4", "Descripcion 4", "Facil");
            
            catalogo = new CatalogoKata();
            catalogo.agregarKata(kata2);
            catalogo.agregarKata(kata1);
            catalogo.agregarKata(kata3);
            catalogo.agregarKata(kata4);
    
            catalogo.ordenarPorNombre();
            
            const listaOrdenada = catalogo.getLista();
            expect(listaOrdenada).toStrictEqual([kata1, kata2, kata3, kata4]);
            expect(listaOrdenada[0].getNombre()).toBe("Kata A");
            expect(listaOrdenada[1].getNombre()).toBe("Kata B");
            expect(listaOrdenada[2].getNombre()).toBe("Kata C");
            expect(listaOrdenada[3].getNombre()).toBe("Kata D");
        });
        
        it('deberia mantener el mismo orden cuando los nombres son iguales', () => {
            const kata1 = new Kata("Kata A", "Autor 1", "Descripcion 1", "Facil");
            const kata2 = new Kata("Kata A", "Autor 2", "Descripcion 2", "Medio");
            const kata3 = new Kata("Kata A", "Autor 3", "Descripcion 3", "Dificil");
            const kata4 = new Kata("Kata A", "Autor 4", "Descripcion 4", "Facil");
            
            catalogo = new CatalogoKata();
            catalogo.agregarKata(kata2);
            catalogo.agregarKata(kata1);
            catalogo.agregarKata(kata3);
            catalogo.agregarKata(kata4);
    
            catalogo.ordenarPorNombre();
            
            const listaOrdenada = catalogo.getLista();
            expect(listaOrdenada).toStrictEqual([kata2, kata1, kata3, kata4]);
            expect(listaOrdenada[0].getAutor()).toBe("Autor 2");
            expect(listaOrdenada[1].getAutor()).toBe("Autor 1");
            expect(listaOrdenada[2].getAutor()).toBe("Autor 3");
            expect(listaOrdenada[3].getAutor()).toBe("Autor 4");
        });
    
        it('debería ordenar correctamente en orden ascendente cuando el primer nombre es mayor que el segundo', () => {
            const kata1 = new Kata("Kata D", "Autor 1", "Descripcion 1", "Fácil");
            const kata2 = new Kata("Kata C", "Autor 2", "Descripcion 2", "Medio");
            const kata3 = new Kata("Kata B", "Autor 3", "Descripcion 3", "Dificil");
            const kata4 = new Kata("Kata A", "Autor 4", "Descripcion 4", "Facil");
            
            catalogo = new CatalogoKata();
            
            catalogo.agregarKata(kata1);
            catalogo.agregarKata(kata2);
            catalogo.agregarKata(kata3);
            catalogo.agregarKata(kata4);
    
            catalogo.ordenarPorNombre();
            
            const listaOrdenada = catalogo.getLista();
            expect(listaOrdenada).toStrictEqual([kata4, kata3, kata2, kata1]);
            expect(listaOrdenada[0].getNombre()).toBe("Kata A");
            expect(listaOrdenada[1].getNombre()).toBe("Kata B");
            expect(listaOrdenada[2].getNombre()).toBe("Kata C");
            expect(listaOrdenada[3].getNombre()).toBe("Kata D");
        });
    });

    describe('Metodo getLista', () => {
        it('deberia retornar la lista completa de katas', () => {
            const kata = new Kata('Kata 0', 'Autor', 'Descripcion', 'Dificultad');
            const kata1 = new Kata('Kata 1', 'Autor', 'Descripcion', 'Dificultad');
            const kata2 = new Kata('Kata 2', 'Autor', 'Descripcion', 'Dificultad');
            const kata3 = new Kata('Kata 3', 'Autor', 'Descripcion', 'Dificultad');
            const kata4 = new Kata('Kata 4', 'Autor', 'Descripcion', 'Dificultad');
            const kata5 = new Kata('Kata 5', 'Autor', 'Descripcion', 'Dificultad');
            const kata6 = new Kata('Kata 6', 'Autor', 'Descripcion', 'Dificultad');
            
            catalogo = new CatalogoKata();
            catalogo.agregarKata(kata);
            catalogo.agregarKata(kata1);
            catalogo.agregarKata(kata2);
            catalogo.agregarKata(kata3);
            catalogo.agregarKata(kata4);
            catalogo.agregarKata(kata5);
            catalogo.agregarKata(kata6);

            const listaKatas = catalogo.getLista();
            expect(listaKatas).toHaveLength(7); 
            expect(listaKatas).toEqual(expect.arrayContaining([kata, kata1, kata2, kata3, kata4, kata5, kata6]));

        });
    });

    describe('Metodos getters', () => {
        it('deberia devolver el nombre de la kata', () => {
            const kata = new Kata('Nombre de Kata');
            const resultado = kata.getNombre();
    
            expect(typeof resultado).toBe('string');
            expect(resultado).toMatch(/^[a-zA-Z\s]+$/); 
            expect(resultado.length).toBeGreaterThanOrEqual(0);  
            expect(resultado.length).toEqual(14);    
            expect(resultado).not.toBeUndefined();
            expect(resultado).toBe('Nombre de Kata');
        });

        it('deberia devolver el nombre del autor de la kata', () => {
            const kata = new Kata('kata', 'Jose Carlos');
            const resultado = kata.getAutor();
    
            expect(typeof resultado).toBe('string');
            expect(resultado).toBe('Jose Carlos');
            expect(resultado).toMatch(/^[a-zA-Z\s]+$/); 
            expect(resultado.length).toBeGreaterThanOrEqual(0);  
            expect(resultado.length).toEqual(11);    
            expect(resultado).not.toBeUndefined();
        });
    
        it('deberia devolver la descripcion de la kata', () => {
            const kata = new Kata('kata', 'autor', 'Esta es una descripcion');
            const resultado = kata.getDescripcion();

            expect(typeof resultado).toBe('string');
            expect(resultado).toBe('Esta es una descripcion');
            expect(resultado).toMatch(/^[a-zA-Z\s]+$/); 
            expect(resultado.length).toBeGreaterThanOrEqual(0);  
            expect(resultado.length).toBeLessThanOrEqual(50)    
            expect(resultado).not.toBeUndefined();
        });

        it('deberia devolver una descripcion corta de la kata', () => {
            const kata = new Kata('kata', 'Jose Carlos', 'Esta es una descripcion larga que debe ser resumida');
            const resultado = kata.getDescCorta();
    
            expect(typeof resultado).toBe('string');
            expect(resultado).toBe('Esta es una desc...');
            expect(resultado).toMatch(/^[\s\S]+$/); 
            expect(resultado.length).toBeGreaterThanOrEqual(0);  
            expect(resultado.length).toEqual(19);    
            expect(resultado).not.toBeUndefined();
        });

        it('deberia devolver la dificultad de la kata', () => {
            const kata = new Kata('kata', 'Jose Carlos', 'descripcion', 'Media');
            const resultado = kata.getDificultad();
    
            expect(typeof resultado).toBe('string');
            expect(resultado).toBe('Media');
            expect(resultado).toMatch(/^[a-zA-Z\s]+$/); 
            expect(resultado.length).toBeGreaterThanOrEqual(0);  
            expect(resultado.length).toBeLessThanOrEqual(10)   
            expect(resultado).not.toBeUndefined();
        });

        it('deberia devolver el id de la Kata cuando no se encuentra en un catalogo', () => {
            const kata = new Kata('kata');
            const resultado = kata.getId();
    
            expect(typeof resultado).toBe('number');
            expect(resultado).toEqual(-1);
            expect(Number.isInteger(resultado)).toBe(true);
            expect(Number.isFinite(resultado)).toBe(true);
            expect(resultado).toBeLessThan(0);
            expect(resultado).not.toBeUndefined();
        });

        it('deberia devolver la puntuacion Kata', () => {
            const kata = new Kata('kata', 'Jose Carlos', 'descripcion', 'Media', 78);
            const resultado = kata.getPuntuacion();
    
            expect(typeof resultado).toBe('number');
            expect(resultado).toEqual(78);
            expect(Number.isInteger(resultado)).toBe(true);
            expect(Number.isFinite(resultado)).toBe(true);
            expect(resultado).toBeLessThanOrEqual(100);
            expect(resultado).toBeGreaterThanOrEqual(-1)
            expect(resultado).not.toBeUndefined();
        });

        it('deberia devolver el estado de una Kata recien creada', () => {
            const kata = new Kata('kata');
            const resultado = kata.getEstado();
    
            expect(typeof resultado).toBe('string');
            expect(resultado).toBe('No Terminado');
            expect(resultado).toMatch(/^[a-zA-Z\s]+$/); 
            expect(resultado).toHaveLength(12)   
            expect(resultado).not.toBeUndefined();
        });
    });
  
    describe('Método mostrar', () => {
        let kata;

        beforeEach(() => {
            kata = new Kata('Kata 1', 'Roberto Carlos'); 
        });

        afterEach(() => {
            kata = null;
        });


        it('Debería mostrar el nombre de la kata y su autor entre divs', () => {
            const resultado = kata.mostrar();

            expect(resultado).toBe('<div>Nombre kata: Kata 1, Autor: Roberto Carlos</div>');
            expect(resultado).not.toBe('Nombre kata: Lata 1, Autor: Roberto Carlos');
            expect(resultado).contain('<div>')
            expect(resultado).contain('</div>') 
            expect(resultado).toMatch(/^<div>.*<\/div>$/);
            expect(resultado.length).toBeGreaterThan(0);
            expect(resultado).not.toBeUndefined()
        });
    });

    describe('Método agregarKata', () => {
        it('Debería añadir una nueva kata al catalogo ordenada por orden de ingreso', () => {
            const kata1 = new Kata('Kata 1', 'Rodrigo'); 
            catalogo.agregarKata(kata1)
            let resultado = catalogo.getLista()

            expect(resultado).toContain(kata1);
            expect(resultado).toHaveLength(1);
            expect(resultado).not.toBeUndefined();

            const kata2 = new Kata('Kata 2', 'Pedro');
            catalogo.agregarKata(kata2);
            resultado = catalogo.getLista();

            expect(resultado).toContain(kata2);
            expect(resultado).toHaveLength(2);
            expect(resultado).toStrictEqual([kata1, kata2])
            expect(resultado).not.toBeUndefined();
            
        });
    });
})
