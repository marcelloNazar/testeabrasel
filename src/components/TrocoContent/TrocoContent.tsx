"use client";

import Button from "@/components/partials/Button";
import Input from "@/components/partials/Input";
import { useTrocoContent } from "./useTrocoContent";

export default function TrocoContent() {

    const {
        handleSubmit,
        submitForm,
        register,
        errors,
        valorCompra,
        valorDinheiro,
        troco
    } = useTrocoContent();

    return (
        <>
            <form onSubmit={handleSubmit(submitForm)} className="flex flex-col w-96 items-center justify-start gap-2 pt-2">
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
            {valorCompra && valorDinheiro ? <div className="flex flex-col w-96 p-2 overflow-auto mt-2 bg-black rounded-md">
                <div className="flex w-full justify-between"><p>Compra:</p> {valorCompra}</div>
                <div className="flex w-full justify-between"><p>Dinheiro:</p> {valorDinheiro}</div>
                <div className="flex w-full justify-between"><p>Notas de 1:</p> {troco.notas1 ? troco.notas1 : "-"}</div>
                <div className="flex w-full justify-between"><p>Notas de 10:</p> {troco.notas10 ? troco.notas10 : "-"}</div>
                <div className="flex w-full justify-between"><p>Notas de 100:</p> {troco.notas100 ? troco.notas100 : "-"}</div>
            </div> : <></>}
        </>
    );
}
