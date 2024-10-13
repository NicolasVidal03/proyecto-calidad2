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
    })
})

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
        expect(resultado).toBe(kata1.mostrar() + kata2.mostrar() + kata3.mostrar());
    });
    it('deberia mostrar vacio en caso de que no hay elementos en el catalogo', () => {
        const catalogo = new CatalogoKata(); 
        const resultado = catalogo.mostrarCatalogoKatas();
        expect(resultado).toBe("");
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


