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
export const useCepContent = () => {

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

    //função para formatar o CEP
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

    // função para fazer requisição para api
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

    return {
        handleSubmit,
        submitForm,
        register,
        errors,
        apiResponses
    };
};
