"use client"

import Button from "@/components/partials/Button";
import Input from "@/components/partials/Input";
import { AiFillDelete } from "react-icons/ai";
import { useCarroForm } from "./useCarroForm";

export default function CarroForm() {

    const {
        handleSubmit,
        submitForm,
        register,
        errors,
        portas,
        carros,
        deleteCar
    } = useCarroForm();

    return (
        <div className="flex flex-col h-full w-full items-center justify-start rounded-md p-2 pl-4 pb-28">
            <h1>Adicionar Carro</h1>
            <form onSubmit={handleSubmit(submitForm)} className="flex flex-col w-full items-center justify-start gap-2 pt-2">
                <Input
                    type="text"
                    {...register("modelo")}
                    placeholder="Modelo"
                    error={errors?.modelo?.message?.toString()}
                />
                <Input
                    type="text"
                    {...register("ano")}
                    placeholder="Ano Fabricação"
                    error={errors?.ano?.message?.toString()}
                />
                <div className="w-full">
                    <select className="input" {...register("portas")} value={portas}>
                        <option value="4" className="dark:text-gray-600">
                            4 Portas
                        </option>
                        <option value="2" className="dark:text-gray-600">
                            2 Portas
                        </option>
                    </select>
                    {errors?.portas?.message && (
                        <p className="text-xs text-red-600">{errors?.portas?.message}</p>
                    )}
                </div>
                <Input
                    type="text"
                    {...register("marca")}
                    placeholder="Marca"
                    error={errors?.marca?.message?.toString()}
                />
                <Button
                    onClick={() => { }}
                    text="Adicionar"
                />
            </form>
            <div className="flex flex-col h-full w-full p-2 bg-black rounded-md overflow-auto mt-2">
                <div className="flex w-full border-b-2">
                    <div className="px-1 w-64 border-r-2">Modelo</div>
                    <div className="px-1 w-14 border-r-2">Ano</div>
                    <div className="px-1 w-16 border-r-2">Portas</div>
                    <div className="px-1 w-48 border-r-2">Marca</div>
                    <div className="px-1 w-6 duration-200">
                        <AiFillDelete />
                    </div>
                </div>
                {carros.map((carro, index) => (
                    <div className="flex w-full border-b-2" key={index}>
                        <div className="px-1 w-64 border-r-2">{carro.modelo}</div>
                        <div className="px-1 w-14 border-r-2">{carro.ano}</div>
                        <div className="px-1 w-16 border-r-2">{carro.portas}</div>
                        <div className="px-1 w-48 border-r-2">{carro.marca}</div>
                        <button
                            className="hover:text-red-600 px-1 w-6 duration-200"
                            onClick={() => deleteCar(carro)}
                        >
                            <AiFillDelete />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
