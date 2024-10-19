import { describe, it, expect, beforeEach } from 'vitest';
import { mostrarKatas, arrayKatasConMismaDificultad } from '../src/buscarPorDificultad';
import { Kata, CatalogoKata } from '../src/katas';

describe('Archivo buscarPorDificultad.js', () => {
    let catalogo;

    beforeEach(() => {
        catalogo = new CatalogoKata();
    });
    
    describe("Función mostrar katas", () => {
        it('Existen katas dentro del catálogo', () => {
            const kata1 = new Kata('Kata 1', 'Angelica', 'Descripcion', 'Dificultad')
            const kata2 = new Kata('Kata 2', 'Maria', 'Descripcion', 'Dificultad')

            catalogo.agregarKata(kata1);
            catalogo.agregarKata(kata2);

            const mensaje = mostrarKatas(catalogo.getLista());
            const resultado_esperado = '<div>Nombre kata: Kata 1, Autor: Angelica</div><div>Nombre kata: Kata 2, Autor: Maria</div>'
            
            expect(mensaje).toBe(resultado_esperado);
        });
        it('El catalogo se encuentra vacío', () => {
            const mensaje = mostrarKatas(catalogo.getLista());
            const resultado_esperado = ''
            
            expect(mensaje).toBe(resultado_esperado);
        });
    });

    describe("metodo arrayKatasConMismaDificultad", () => {
        it('deberia devolver las katas con la dificultad especificada', () => {
            const kata1 = new Kata('Kata 1', 'Angelica', 'Descripción', 'Media');
            const kata2 = new Kata('Kata 2', 'Maria', 'Descripción', 'Alta');    
            const kata3 = new Kata('Kata 3', 'Pedro', 'Descripción', 'Media');   

            catalogo.agregarKata(kata1);
            catalogo.agregarKata(kata2);
            catalogo.agregarKata(kata3);

            const resultado = arrayKatasConMismaDificultad(catalogo, 'Media');
            const resultadoEsperado = [kata1, kata3]; 

            expect(resultado).toEqual(resultadoEsperado);
            expect(resultado).toContain(kata1); 
            expect(resultado).toContain(kata3); 
            expect(resultado).toHaveLength(2);
        });
    });
});