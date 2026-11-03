export const palette = {
    aqua: '#12D6C1',
    ciano: '#08BFE8',
    azul: '#3FA2FF',
    royal: '#2563EB',
    lilas: '#7B5CFF',
    violeta: '#4B2CFF',
    magenta: '#B04DFF',
};
const t = (a, b, glow = 1) => ({ a, b, glow });
const p = palette;
export const themes = {
    // Início
    hero: t(p.ciano, p.royal, 1.2),
    pillars: t(p.azul, p.royal, 0.9),
    servicesTeaser: t(p.lilas, p.violeta, 1),
    projectTeaser: t(p.aqua, p.ciano, 1),
    cta: t(p.ciano, p.lilas, 1.15),
    // Processo — uma cor por etapa
    step1: t(p.aqua, p.aqua, 1.1),
    step2: t(p.ciano, p.ciano, 1.1),
    step3: t(p.azul, p.azul, 1.1),
    step4: t(p.lilas, p.lilas, 1.15),
    step5: t(p.magenta, p.magenta, 1.15),
    // Páginas
    solucoes: t(p.lilas, p.violeta, 1.1),
    principios: t(p.magenta, p.lilas, 1),
    projetos: t(p.aqua, p.ciano, 1.1),
    sobre: t(p.azul, p.royal, 1.1),
    dna1: t(p.lilas, p.violeta, 1.25),
    dna2: t(p.azul, p.lilas, 1.25),
    dna3: t(p.ciano, p.azul, 1.25),
    contato: t(p.magenta, p.royal, 1.15),
};
export const encodeTheme = (th) => `${th.a},${th.b},${th.glow}`;
export function decodeTheme(s) {
    const [a, b, g] = s.split(',');
    return { a, b, glow: Number(g) };
}
