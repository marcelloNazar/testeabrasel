"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

const PalindromoSchema = z.object({
    numero1: z.string().min(1, "Digite um Numero").max(8, "Maximo 8 Digitos"),
    numero2: z.string().min(1, "Digite um Numero").max(8, "Maximo 8 Digitos"),
})

type PalindromoType = z.infer<typeof PalindromoSchema>


export default function Page() {

    const [palindromes, setPalindromes] = useState<number[]>([]);

    const {
        formState: { errors },
        register,
        handleSubmit,
        setValue,
        watch,
    } = useForm<PalindromoType>({
        resolver: zodResolver(PalindromoSchema),
    });

    const numero1 = watch("numero1");
    const numero2 = watch("numero2");

    function formatString(str: string) {
        if (!str) return "";

        let cleanedStr = str.replace(/\D/g, ""); // Remove caracteres não numéricos

        return cleanedStr;
    }
    useEffect(() => {
        setValue("numero1", formatString(numero1));
        setValue("numero2", formatString(numero2));
    }, [
        numero1, numero2,
    ]);


    const isPalindrome = (num: number) => {
        const str = num.toString();
        return str === str.split('').reverse().join('');
    };

    const submitForm: SubmitHandler<PalindromoType> = async (values) => {
        const { numero1, numero2 } = values; // Supondo que 'numero1' e 'numero2' são os números fornecidos pelo usuário

        const start = Math.min(Number(numero1), Number(numero2));
        const end = Math.max(Number(numero1), Number(numero2));

        setPalindromes([]);


        for (let i = start; i <= end; i++) {
            if (isPalindrome(i)) {
                setPalindromes((prev) => [...prev, i])
            }
        }
    };

    return (
        <main className="flex flex-col h-full w-full min-h-screen items-center justify-start p-4">
            <div className="flex flex-col h-full w-full max-w-7xl items-center p-2 pb-24 gap-2 justify-start bg-gray-900 rounded-md">
                <form onSubmit={handleSubmit(submitForm)} className="flex flex-col items-center justify-start gap-2 pt-2">
                    <Input
                        type="text"
                        {...register("numero1")}
                        placeholder="Numero 1"
                        error={errors?.numero1?.message?.toString()}
                    />
                    <Input
                        type="text"
                        {...register("numero2")}
                        placeholder="Numero 2"
                        error={errors?.numero2?.message?.toString()}
                    />
                    <Button
                        onClick={() => { }}
                        text="Enviar"
                    />
                </form>
                <div className="flex flex-col h-full p-2 overflow-auto mt-2">
                    {palindromes.map((palindrome, index) => (
                        <p key={index}>{palindrome}</p>
                    ))}
                </div>
            </div>
        </main>
    );
}
