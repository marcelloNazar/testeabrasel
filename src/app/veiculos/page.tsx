"use client"

import { Carro, Moto } from "@/models/Veiculo";
import { useState } from "react";

//utilizar hook form para observar a entrada e saida de dados para saber se é carro ou moto ou utilizar dois formularios diferentes
//descobrir como salvar em json para não precisar de banco de dados
export default function Page() {

    const [modelo, setModelo] = useState('');
    const [anoFabricacao, setAnoFabricacao] = useState(0);
    const [quantidadePortas, setQuantidadePortas] = useState(0);
    const [marca, setMarca] = useState('');
    const [passageiros, setPassageiros] = useState(0);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const carro = new Carro(modelo, anoFabricacao, quantidadePortas, marca);
        const moto = new Moto(modelo, anoFabricacao, quantidadePortas, marca, passageiros);

        // Salvar `carro` ou `moto` em um arquivo JSON

    };

    return (
        <div className="flex flex-col h-full w-full max-w-7xl items-center justify-start bg-gray-900 rounded-md">
            <form className="flex flex-col" onSubmit={handleSubmit}>
                <label>
                    Modelo:
                    <input type="text" value={modelo} onChange={e => setModelo(e.target.value)} />
                </label>
                <label>
                    Ano de Fabricação:
                    <input type="number" value={anoFabricacao} onChange={e => setAnoFabricacao(Number(e.target.value))} />
                </label>
                <label>
                    Quantidade de Portas:
                    <input type="number" value={quantidadePortas} onChange={e => setQuantidadePortas(Number(e.target.value))} />
                </label>
                <label>
                    Marca:
                    <input type="text" value={marca} onChange={e => setMarca(e.target.value)} />
                </label>
                <label>
                    Passageiros:
                    <input type="number" value={passageiros} onChange={e => setPassageiros(Number(e.target.value))} />
                </label>
                <button type="submit">Salvar</button>
            </form>
        </div>
    );
}
