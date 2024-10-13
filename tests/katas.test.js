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
    
})

