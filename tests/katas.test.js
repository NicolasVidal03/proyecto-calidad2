import { describe, it, expect } from 'vitest';
import { CatalogoKata, Kata } from '../src/katas';

describe('CatalogoKata Class', () => {
    it('should always be true', () => {
        expect(true).toBe(true);
    });

    it('deberia mostrar vacio en caso de que no hay elementos en el catalogo', () => {
        const catalogo = new CatalogoKata(); 
        const resultado = catalogo.mostrarCatalogoKatas();
        expect(resultado).toBe("");
    });

})

