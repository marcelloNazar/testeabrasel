// Veiculo.ts
export interface Veiculo {
    modelo: string;
    anoFabricacao: number;
    quantidadePortas: number;
    marca: string;
}

export class Carro implements Veiculo {
    modelo: string;
    anoFabricacao: number;
    quantidadePortas: number;
    marca: string;

    constructor(modelo: string, anoFabricacao: number, quantidadePortas: number, marca: string) {
        this.modelo = modelo;
        this.anoFabricacao = anoFabricacao;
        this.quantidadePortas = quantidadePortas;
        this.marca = marca;
    }
}

export class Moto implements Veiculo {
    modelo: string;
    anoFabricacao: number;
    quantidadePortas: number;
    marca: string;
    rodas: number = 2;
    passageiros: number;

    constructor(modelo: string, anoFabricacao: number, quantidadePortas: number, marca: string, passageiros: number) {
        this.modelo = modelo;
        this.anoFabricacao = anoFabricacao;
        this.quantidadePortas = quantidadePortas;
        this.marca = marca;
        this.passageiros = passageiros;
    }
}
