import { describe, it, expect, beforeEach } from 'vitest';
import { CatalogoKata, Kata } from '../src/katas'; 

describe('CatalogoKata Class', () => {
    let catalogo;

    beforeEach(() => {
        catalogo = new CatalogoKata();
    });

    describe('ordenarPorDescripcion method', () => {
        it('should maintain the same order when descriptions are equal', () => {
            const kata1 = new Kata("Kata 1", "Autor 1", "Descripción Igual", "Fácil");
            const kata2 = new Kata("Kata 2", "Autor 2", "Descripción Igual", "Medio");
        
            catalogo.agregarKata(kata1);
            catalogo.agregarKata(kata2);
        
            catalogo.ordenarPorDescripcion();
        
            const listaOrdenada = catalogo.getLista();
            expect(listaOrdenada[0].getDescripcion()).toBe("Descripción Igual");
            expect(listaOrdenada[1].getDescripcion()).toBe("Descripción Igual");
        });
        it('should sort correctly when descripcionA is lexicographically greater than descripcionB', () => {
            const kata1 = new Kata("Kata 1", "Autor 1", "Zebra", "Fácil");
            const kata2 = new Kata("Kata 2", "Autor 2", "Águila", "Medio");
        
            catalogo.agregarKata(kata1);
            catalogo.agregarKata(kata2);
        
            catalogo.ordenarPorDescripcion();
        
            const listaOrdenada = catalogo.getLista();
            expect(listaOrdenada[0].getDescripcion()).toBe("Zebra");
            expect(listaOrdenada[1].getDescripcion()).toBe("Águila");
        });
        it('should sort correctly when descripcionA is lexicographically greater than descripcionB', () => {
            const kata1 = new Kata("Kata 1", "Autor 1", "Águila", "Fácil");
            const kata2 = new Kata("Kata 2", "Autor 2", "Zebra", "Medio");
        
            catalogo.agregarKata(kata1);
            catalogo.agregarKata(kata2);
        
            catalogo.ordenarPorDescripcion();
        
            const listaOrdenada = catalogo.getLista();
            expect(listaOrdenada[0].getDescripcion()).toBe("Zebra");
            expect(listaOrdenada[1].getDescripcion()).toBe("Águila");
        });
    })

    describe('buscarPorAuthor method', () => {
        it('should return an empty list when the kata list is empty', () => {
            const resultados = catalogo.buscarPorAutor("Autor A");
            expect(resultados.length).toBe(0); 
        });  
        it('should return an empty list when there are no katas with the specified author', () => {
            const kata1 = new Kata("Kata 1", "Autor B", "Descripción 1", "Fácil");
            catalogo.agregarKata(kata1);
            const resultados = catalogo.buscarPorAutor("Autor A");
            expect(resultados.length).toBe(0);
        });
        it('should return a list with one match when there is a kata with the specified author', () => {
            const kata1 = new Kata("Kata 1", "Autor A", "Descripción 1", "Fácil");        
            catalogo.agregarKata(kata1);        
            const resultados = catalogo.buscarPorAutor("Autor A");
            expect(resultados.length).toBe(1);
            expect(resultados[0].getAutor()).toBe("Autor A");
        });
    });

    describe('buscarPorEstado method', () => {
        it('should return an empty list when the list of katas is empty', () => {
            const resultado = catalogo.buscarPorEstado("Terminado");
            expect(resultado.length).toBe(0);
        });
        it('should return an empty list when there are no katas with the searched state', () => {
            const kata1 = new Kata("Kata 1", "Autor A", "Descripción 1", "Difícil");
            kata1.setEstado("Terminado");
            catalogo.agregarKata(kata1);
            const resultado = catalogo.buscarPorEstado("No terminado");
            expect(resultado.length).toBe(0);
        }); 
        it('should return a list with matches when there are katas with the searched state', () => {
            const kata1 = new Kata("Kata 1", "Autor A", "Descripción 1", "Fácil");
            kata1.setEstado("Terminado");
            catalogo.agregarKata(kata1);
            const resultado = catalogo.buscarPorEstado("Terminado");
            expect(resultado.length).toBe(1);
            expect(resultado).toContain(kata1);
        });
    });

    describe('buscarPorId method', () => {
        it("should return undefined when listaKatas is empty", () => {
            const catalogo = new CatalogoKata();
            const result = catalogo.buscarPorId(1);
            expect(result).toBeUndefined();
        });
        it("should return the kata with the matching ID", () => {
            const kata1 = new Kata("Kata 1", "Author A", "Description 1", "Easy");
            kata1.setId(1);
            const catalogo = new CatalogoKata();
            catalogo.listaKatas = [kata1];
            const result = catalogo.buscarPorId(1);
            expect(result).toBe(kata1);
        });
        it("should return undefined when no kata matches the given ID", () => {
            const kata1 = new Kata("Kata 1", "Author A", "Description 1", "Easy");
            kata1.setId(1);
            const catalogo = new CatalogoKata();
            catalogo.listaKatas = [kata1];
            
            const result = catalogo.buscarPorId(3);
            expect(result).toBeUndefined();
        });  
    });

    describe('Ordenar por autor', () => {
        it('nombreA es menor que nombreB', () => {
            const nombreA = new Kata("Kata 1", "Angelica");
            const nombreB = new Kata("Kata 2", "Bernardo");

            catalogo.agregarKata(nombreA);
            catalogo.agregarKata(nombreB);

            catalogo.ordenarPorAutor();

            expect(catalogo.getLista()[0].getAutor()).toBe("Angelica");
        });
        it('nombreA es mayor que nombreB', () => {
            const nombreA = new Kata("Kata 1", "Romero");
            const nombreB = new Kata("Kata 2", "Andres");

            catalogo.agregarKata(nombreA);
            catalogo.agregarKata(nombreB);

            catalogo.ordenarPorAutor();

            expect(catalogo.getLista()[0].getAutor()).toBe("Andres");
        });
        it('nombreA es igual a nombreB', () => {
            const nombreA = new Kata("Kata 1", "Jorge");
            const nombreB = new Kata("Kata 2", "Jorge");

            catalogo.agregarKata(nombreA);
            catalogo.agregarKata(nombreB);

            catalogo.ordenarPorAutor();

            expect(catalogo.getLista()[0].getAutor()).toBe("Jorge");
        });
    });
})