import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8', // Usa v8 para la cobertura
      reporter: ['text', 'html', 'lcov'], // Asegúrate de incluir 'lcov' aquí
      reportsDirectory: './coverage', // Elige el directorio para los reportes de cobertura
      include: [
        '**/buscarPorDificultad.js', 
        '**/katas.js', 
        '**/usuario.js', 
      ],
    },
  }
});
