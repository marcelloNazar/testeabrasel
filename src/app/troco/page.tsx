"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

const TrocoSchema = z.object({
    valorCompra: z.string().nonempty(),
    valorDinheiro: z.string().nonempty(),
})

type TrocoType = z.infer<typeof TrocoSchema>



export default function Page() {


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

    function formatString(str: string) {
        if (!str) return "";

        let cleanedStr = str.replace(/\D/g, ""); // Remove caracteres não numéricos

        return cleanedStr;
    }

    useEffect(() => {
        setValue("valorCompra", formatString(valorCompra));
        setValue("valorDinheiro", formatString(valorDinheiro));
    }, [
        valorCompra, valorDinheiro
    ]);

    const submitForm: SubmitHandler<TrocoType> = async (values) => {
        let compra = Number(values.valorCompra)
        let dinheiro = Number(values.valorDinheiro)
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

    return (
        <main className="flex flex-col h-full w-full min-h-screen items-center justify-start p-4 pb-32">
            <div className="flex flex-col h-full w-full items-center justify-start p-2 gap-2 bg-gray-900 rounded-md">
                <form onSubmit={handleSubmit(submitForm)} className="flex w-96 flex-col items-center justify-start gap-2 pt-2">
                    <Input
                        type="text"
                        {...register("valorCompra")}
                        placeholder="Valor da Compra"
                        error={errors?.valorCompra?.message?.toString()}
                    />
                    <Input
                        type="text"
                        {...register("valorDinheiro")}
                        placeholder="Valor em dinheiro"
                        error={errors?.valorDinheiro?.message?.toString()}
                    />
                    <Button
                        onClick={() => { }}
                        text="Calcular"
                    />
                </form>
                {valorCompra && valorDinheiro ? <div className="flex flex-col h-full w-96 p-2 overflow-auto">
                    <div className="flex w-full justify-between"><p>Compra:</p> {`$ ${valorCompra}`}</div>
                    <div className="flex w-full justify-between"><p>Dinheiro:</p> {`$ ${valorDinheiro}`}</div>
                    <div className="flex w-full justify-between"><p>Notas de 1:</p> {troco.notas1}</div>
                    <div className="flex w-full justify-between"><p>Notas de 10:</p> {troco.notas10}</div>
                    <div className="flex w-full justify-between"><p>Notas de 100:</p> {troco.notas100}</div>
                </div> : <></>}
            </div>
        </main>
    );
}
