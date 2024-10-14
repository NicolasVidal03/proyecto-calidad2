import { describe, it, expect, beforeEach } from 'vitest';
import { mostrarKatas } from '../src/buscarPorDificultad';
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

});