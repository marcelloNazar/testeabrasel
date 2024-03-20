import CarroForm from "@/components/CarroForm/CarroForm";
import MotoForm from "@/components/MotoForm/MotoForm";

export default function Page() {
    return (
        <div className="flex flex-row h-full w-full max-w-7xl items-center justify-start bg-gray-900 rounded-md">
            <CarroForm />
            <MotoForm />
        </div>
    );
}
