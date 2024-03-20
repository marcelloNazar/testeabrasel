import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

const TrocoSchema = z.object({
    valorCompra: z.string().min(0).max(18, "Maximo 15 Digitos"),
    valorDinheiro: z.string().min(0).max(18, "Maximo 15 Digitos")
})

type TrocoType = z.infer<typeof TrocoSchema>


export const useTrocoContent = () => {

    const [troco, setTroco] = useState({ notas100: 0, notas10: 0, notas1: 0 });

    const {
        formState: { errors },
        register,
        handleSubmit,
        setValue,
        watch,
    } = useForm<TrocoType>({
        resolver: zodResolver(TrocoSchema),
    });

    const valorCompra = watch("valorCompra");
    const valorDinheiro = watch("valorDinheiro");

    //função para formatar a string, permitindo apenas algarismos numericos e acrescentando R$
    function formatString(str: string) {
        if (!str) return "";
        let cleanedStr = str.replace(/\D/g, "");
        return `R$ ${cleanedStr}`;
    }

    //função para remover o R$ para fazer os calculos
    function removeR$(valor: string): number {
        const valorSemR$ = valor.replace('R$', '').trim();
        return Number(valorSemR$);
    }

    useEffect(() => {
        setValue("valorCompra", formatString(valorCompra));
        setValue("valorDinheiro", formatString(valorDinheiro));
    }, [
        valorCompra, valorDinheiro
    ]);

    //Função para calcular a quantidade de notas e o troco
    const submitForm: SubmitHandler<TrocoType> = (values) => {
        let compra = removeR$(values.valorCompra)
        let dinheiro = removeR$(values.valorDinheiro)
        let valorTroco = dinheiro - compra
        let notas100 = 0, notas10 = 0, notas1 = 0;
        if (valorTroco >= 100) {
            notas100 = Math.floor(valorTroco / 100);
            valorTroco -= notas100 * 100;
        }
        if (valorTroco >= 10) {
            notas10 = Math.floor(valorTroco / 10);
            valorTroco -= notas10 * 10;
        }
        notas1 = valorTroco;
        setTroco({ notas100, notas10, notas1 });
    };

    return {
        handleSubmit,
        submitForm,
        register,
        errors,
        valorCompra,
        valorDinheiro,
        troco
    };
};