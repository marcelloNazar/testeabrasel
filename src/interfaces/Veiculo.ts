// Veiculo.ts
export interface Veiculo {
    modelo: string;
    ano: string;
    portas: string;
    marca: string;
}

export class Carro implements Veiculo {
    modelo: string;
    ano: string;
    portas: string;
    marca: string;

    constructor(modelo: string, ano: string, portas: string, marca: string) {
        this.modelo = modelo;
        this.ano = ano;
        this.portas = portas;
        this.marca = marca;
    }
}

export class Moto implements Veiculo {
    modelo: string;
    ano: string;
    portas: string;
    marca: string;
    rodas: string = "2";
    passageiros: string;

    constructor(modelo: string, ano: string, portas: string, marca: string, passageiros: string) {
        this.modelo = modelo;
        this.ano = ano;
        this.portas = portas;
        this.marca = marca;
        this.passageiros = passageiros;
    }
}
