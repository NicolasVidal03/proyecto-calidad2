import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { Estudiante, Usuario, Docente } from "../src/usuario"

describe('metodo getNombre de clase usuario', () => {
    let usuario;
    beforeEach(() => {
        usuario = new Usuario('Juan', 'Descripcion');
    });

    afterEach(() => {
        usuario = null;
    });
    it('deberia devolver el nombre del usuario despues de instanciar la clase Usuario', () => {

        const resultado = usuario.getNombre();

        expect(resultado).toMatch(/^[a-zA-Z]+$/); 
        expect(resultado.length).toBeGreaterThanOrEqual(2);  
        expect(resultado.length).toBeLessThanOrEqual(50);    
        expect(resultado).not.toBeUndefined();
        expect(resultado).toBe('Juan');
    });

});

describe('metodo getDesc de clase usuario', () => {
    let usuario;
    beforeEach(() => {
        usuario = new Usuario('Juan', 'Descripcion');
    });

    afterEach(() => {
        usuario = null;
    });
    it('deberia devolver la descripcion del usuario despues de instanciar la clase Usuario', () => {
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

describe('Clase Docente', () => {
    let docente;

    beforeEach(() => {
        docente = new Docente('Camilo', 'Descripción', 80);
    });

    afterEach(() => {
        docente = null;
    });

    it('debería devolver "docente" como tipo', () => {
        const tipoEsperado = 'docente';
        const tipoObtenido = docente.getTipo();

        expect(tipoObtenido).toBe(tipoEsperado);
        expect(tipoObtenido).not.toBe('estudiante');
        expect(tipoObtenido).toEqual(expect.any(String));
    });
});
