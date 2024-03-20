import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Carro } from "@/interfaces/Veiculo";

const CarroSchema = z.object({
    modelo: z.string().min(1).max(26, "Maximo 26 Digitos"),
    ano: z.string().length(4, "Ano deve ter 4 digitos"),
    portas: z.string().min(0).max(1),
    marca: z.string().min(1).max(20, "Maximo 20 Digitos"),
})

type CarroType = z.infer<typeof CarroSchema>

export const useCarroForm = () => {

    const [carros, setCarros] = useState<CarroType[]>([]);

    const {
        formState: { errors },
        register,
        handleSubmit,
        setValue,
        watch,
    } = useForm<CarroType>({
        resolver: zodResolver(CarroSchema),
    });

    const modelo = watch("modelo");
    const ano = watch("ano");
    const portas = watch("portas");
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
        setValue("portas", portas);
        setValue("marca", marca);
    }, [
        modelo, ano, portas, marca
    ]);

    useEffect(() => {
        const data = getData();
        setCarros(data);
    }, []);

    // função para recuperar dados do Local storage
    const getData = () => {
        const data = localStorage.getItem('carroData');
        return data ? JSON.parse(data) : [];
    }

    // função para recuperar dados do Local storage
    const deleteCar = (carroToDelete: CarroType) => {
        const updatedCarros = carros.filter(carro => carro !== carroToDelete);
        setCarros(updatedCarros);
        localStorage.setItem('carroData', JSON.stringify(updatedCarros));
    }

    // função para recuperar dados do Local storage
    const submitForm: SubmitHandler<CarroType> = async (values) => {
        const carro = new Carro(values.modelo, values.ano, values.portas, values.marca);
        const data = [...carros, carro];
        localStorage.setItem('carroData', JSON.stringify(data));
        setCarros(data);
    };


    return {
        handleSubmit,
        submitForm,
        register,
        errors,
        portas,
        carros,
        deleteCar
    };
};
