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
    });
})