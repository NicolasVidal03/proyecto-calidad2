import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { Estudiante, Usuario } from "../src/usuario"

describe('metodo getNombre', () => {
    it('deberia devolver el nombre del usuario despues de instanciar la clase Usuario', () => {
        const usuario = new Usuario('Juan', 'Descripcion');
        const resultado = usuario.getNombre();

        expect(resultado).toMatch(/^[a-zA-Z]+$/); 
        expect(resultado.length).toBeGreaterThanOrEqual(2);  
        expect(resultado.length).toBeLessThanOrEqual(50);    
        expect(resultado).not.toBeUndefined();
        expect(resultado).toBe('Juan');
    });

});

describe('metodo getDesc', () => {
    it('deberia devolver la descripcion del usuario despues de instanciar la clase Usuario', () => {
        const usuario = new Usuario('Juan', 'Descripcion');
        const resultado = usuario.getDesc();

        expect(resultado.length).toBeGreaterThanOrEqual(2);  
        expect(resultado.length).toBeLessThanOrEqual(100);    
        expect(resultado).not.toBeUndefined();
        expect(resultado).toBe('Descripcion');
    });
});

describe('Metodo getTipo() de Estudiante', () => {
    let estudiante;
    
    beforeEach(() => {
        estudiante = new Estudiante('Juan', 'Descripcion', 70);
    });

    afterEach(() => {
        estudiante = null;
    });

    it('Debería devolver el tipo del estudiante despues de instanciar la clase Usuario', () => {
        const resultado = estudiante.getTipo();

        expect(resultado).toBe('estudiante')
        expect(resultado).not.toBe('docente') 
        expect(typeof resultado).toBe('string')
        expect(resultado).toHaveLength(10) 
        expect(resultado).toMatch(/^[a-zA-Z]+$/);    
        expect(resultado).not.toBeUndefined();
    });
});
