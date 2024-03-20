import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

const PalindromoSchema = z.object({
    numero1: z.string().min(1, "Digite um Numero").max(8, "Maximo 8 Digitos"),
    numero2: z.string().min(1, "Digite um Numero").max(8, "Maximo 8 Digitos"),
})

type PalindromoType = z.infer<typeof PalindromoSchema>


export const usePalindromosContent = () => {

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

    //função que remove caracteres não numericos
    function formatString(str: string) {
        if (!str) return "";
        let cleanedStr = str.replace(/\D/g, "");
        return cleanedStr;
    }

    useEffect(() => {
        setValue("numero1", formatString(numero1));
        setValue("numero2", formatString(numero2));
    }, [
        numero1, numero2,
    ]);

    //função para verificar se é palindromo
    const isPalindrome = (num: number) => {
        const str = num.toString();
        return str === str.split('').reverse().join('');
    };

    //função para adicionar os palindromos no arrei do intervalo
    const submitForm: SubmitHandler<PalindromoType> = (values) => {
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

    return {
        handleSubmit,
        submitForm,
        register,
        errors,
        palindromes
    };
};