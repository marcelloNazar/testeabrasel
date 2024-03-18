"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { useState } from "react";


export default function Page() {

    const [number1, setNumber1] = useState("");
    const [number2, setNumber2] = useState("");

    return (
        <main className="flex flex-col h-full w-full min-h-screen items-center justify-start p-4 pb-28">
            <div className="flex flex-col h-full w-full items-center justify-start bg-gray-800 rounded-md">
                <form>
                    <Input
                        type="text"
                        placeholder="Data"
                    />
                    <Button
                        onClick={() => { }}
                        text={"botão"}
                    />
                </form>
            </div>
            <div>testando</div>
        </main>
    );
}
