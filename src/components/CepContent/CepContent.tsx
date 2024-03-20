"use client"

import Button from "@/components/partials/Button";
import Input from "@/components/partials/Input";
import { useCepContent } from "./useCepContent";

export default function CepContent() {

    const {
        handleSubmit,
        submitForm,
        register,
        errors,
        apiResponses
    } = useCepContent();

    return (
        <>
            <form onSubmit={handleSubmit(submitForm)} className="flex flex-col items-center justify-start gap-2 pt-2">
                <Input
                    type="text"
                    {...register("cep1")}
                    placeholder="CEP"
                    error={errors?.cep1?.message?.toString()}
                />
                <Input
                    type="text"
                    {...register("cep2")}
                    placeholder="CEP"
                    error={errors?.cep2?.message?.toString()}
                />
                <Input
                    type="text"
                    {...register("cep3")}
                    placeholder="CEP"
                    error={errors?.cep3?.message?.toString()}
                />
                <Input
                    type="text"
                    {...register("cep4")}
                    placeholder="CEP"
                    error={errors?.cep4?.message?.toString()}
                />
                <Input
                    type="text"
                    {...register("cep5")}
                    placeholder="CEP"
                    error={errors?.cep5?.message?.toString()}
                />
                <Button
                    onClick={() => { }}
                    text="Enviar"
                />
            </form>

            {apiResponses.length ? <div className="flex flex-col mt-4 p-4 gap-2 bg-black rounded-md">
                <div className="flex w-full border-b-2">
                    <div className="px-2 w-28 border-r-2">CEP</div>
                    <div className="px-2 w-64 border-r-2">Localidade</div>
                    <div className="px-2 w-12 border-r-2">UF</div>
                    <div className="px-2 w-14 border-r-2">DDD</div>
                    <div className="px-2 w-24 border-r-2">IBGE</div>
                    <div className="px-2 w-48 border-r-2">Bairro</div>
                    <div className="px-2 w-48 border-r-2">Logadouro</div>
                    <div className="px-2 w-20 border-r-2">Compl.</div>
                    <div className="px-2 w-16 border-r-2">Siafi</div>
                    <div className="px-2 w-12">Gia</div>
                </div>
                {apiResponses.map((response, index) => (
                    <div key={index}>
                        {response.cep ? (
                            <div className="flex border-b-2">
                                <div className="px-2 w-28 border-r-2">{response.cep}</div>
                                <div className="px-2 w-64 border-r-2">{response.localidade}</div>
                                <div className="px-2 w-12 border-r-2">{response.uf}</div>
                                <div className="px-2 w-14 border-r-2">{response.ddd}</div>
                                <div className="px-2 w-24 border-r-2">{response.ibge}</div>
                                <div className="px-2 w-48 border-r-2">{response.bairro}</div>
                                <div className="px-2 w-48 border-r-2">{response.logradouro}</div>
                                <div className="px-2 w-20  border-r-2">{response.complemento}</div>
                                <div className="px-2 w-16 border-r-2">{response.siafi}</div>
                                <div className="px-2 w-12">{response.gia}</div>
                            </div>
                        ) :
                            <div className="px-2 flex border-b-2">CEP Invalido</div>}
                    </div>
                ))}
            </div> : <></>}
        </>
    );
}
