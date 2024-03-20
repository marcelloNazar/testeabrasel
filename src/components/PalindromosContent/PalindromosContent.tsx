"use client";

import Button from "@/components/partials/Button";
import Input from "@/components/partials/Input";
import { usePalindromosContent } from "./usePalindromosContent";

export default function PalindromosContent() {

    const {
        handleSubmit,
        submitForm,
        register,
        errors,
        palindromes
    } = usePalindromosContent();

    return (
        <>
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
        </>
    );
}
