"use client"

import Button from "@/components/Button";
import Input from "@/components/Input";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

const CepSchema = z.object({
    cep1: z.string().length(9, "Exatamente 8 Digitos"),
    cep2: z.string().length(9, "Exatamente 8 Digitos"),
    cep3: z.string().length(9, "Exatamente 8 Digitos"),
    cep4: z.string().length(9, "Exatamente 8 Digitos"),
    cep5: z.string().length(9, "Exatamente 8 Digitos"),
})

type CepType = z.infer<typeof CepSchema>

interface ApiResponse {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    ibge: string;
    gia: string;
    ddd: string;
    siafi: string;
}

export default function Page() {

    const [apiResponses, setApiResponses] = useState<ApiResponse[]>([]);

    const {
        formState: { errors },
        register,
        handleSubmit,
        setValue,
        watch,
    } = useForm<CepType>({
        resolver: zodResolver(CepSchema),
    });

    const cep1 = watch("cep1");
    const cep2 = watch("cep2");
    const cep3 = watch("cep3");
    const cep4 = watch("cep4");
    const cep5 = watch("cep5");

    function formatCEP(cep: string) {
        if (!cep) return "";

        let cleanedCEP = cep.replace(/\D/g, "");

        if (cleanedCEP.length > 8) {
            cleanedCEP = cleanedCEP.slice(0, 8);
        }

        return cleanedCEP.replace(/(\d{5})(\d{3})/, "$1-$2");
    }


    useEffect(() => {
        setValue("cep1", formatCEP(cep1));
        setValue("cep2", formatCEP(cep2));
        setValue("cep3", formatCEP(cep3));
        setValue("cep4", formatCEP(cep4));
        setValue("cep5", formatCEP(cep5));
    }, [
        cep1, cep2, cep3, cep4, cep5
    ]);

    const submitForm: SubmitHandler<CepType> = async (values) => {

        const ceps = Object.values(values);

        setApiResponses([]);

        for (let cep of ceps) {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();
            setApiResponses((prevResponses) => [...prevResponses, data]);

            //await new Promise(resolve => setTimeout(resolve, 1000))
        }
    };
    return (
        <div className="flex flex-col h-full w-full max-w-7xl items-center justify-start p-2 px-4 bg-gray-900 rounded-md">
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
        </div>
    );
}
