import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Moto } from "@/interfaces/Veiculo";

const MotoSchema = z.object({
    modelo: z.string().min(1).max(26, "Maximo 6 Digitos"),
    ano: z.string().length(4, "Ano deve ter 4 digitos"),
    passageiros: z.string().min(0).max(1),
    marca: z.string().min(1).max(20, "Maximo 20 Digitos"),
})

type MotoType = z.infer<typeof MotoSchema>


export const useMotoForm = () => {

    const [motos, setMotos] = useState<MotoType[]>([]);

    const {
        formState: { errors },
        register,
        handleSubmit,
        setValue,
        watch,
    } = useForm<MotoType>({
        resolver: zodResolver(MotoSchema),
    });

    const modelo = watch("modelo");
    const ano = watch("ano");
    const passageiros = watch("passageiros");
    const marca = watch("marca");

    // função para formatar o input do ano
    function formatStringYear(str: string) {
        if (!str) return "";
        let cleanedStr = str.replace(/\D/g, ""); // Remove caracteres não numéricos
        cleanedStr = cleanedStr.substring(0, 4); // Limita a string para apenas 4 dígitos
        return `${cleanedStr}`;
    }

    useEffect(() => {
        setValue("modelo", modelo);
        setValue("ano", formatStringYear(ano));
        setValue("passageiros", passageiros);
        setValue("marca", marca);
    }, [
        modelo, ano, passageiros, marca
    ]);

    useEffect(() => {
        const data = getData();
        setMotos(data);
    }, []);

    // função para recuperar dados do Local storage
    const getData = () => {
        const data = localStorage.getItem('motoData');
        return data ? JSON.parse(data) : [];
    }

    // função para deletar dados do Local storage
    const deleteCar = (motoToDelete: MotoType) => {
        const updatedMotos = motos.filter(moto => moto !== motoToDelete);
        setMotos(updatedMotos);
        localStorage.setItem('motoData', JSON.stringify(updatedMotos));
    }

    // função para salvar dados no Local storage
    const submitForm: SubmitHandler<MotoType> = async (values) => {
        const moto = new Moto(values.modelo, values.ano, "", values.marca, values.passageiros);
        const data = [...motos, moto];
        localStorage.setItem('motoData', JSON.stringify(data));
        setMotos(data);
    };


    return {
        handleSubmit,
        submitForm,
        register,
        errors,
        passageiros,
        motos,
        deleteCar
    };
};
