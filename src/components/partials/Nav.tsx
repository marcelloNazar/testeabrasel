"use client";

import { HiHome } from "react-icons/hi2";
import { TbNumber22Small } from "react-icons/tb";
import { FaMoneyBillAlt, FaCarAlt, FaLocationArrow } from "react-icons/fa";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export const navData = [
    { name: "inicio", path: "/", icon: <HiHome /> },
    { name: "palindromos", path: "/palindromos", icon: <TbNumber22Small /> },
    { name: "troco", path: "/troco", icon: <FaMoneyBillAlt /> },
    { name: "veiculos", path: "/veiculos", icon: <FaCarAlt /> },
    { name: "cep", path: "/cep", icon: <FaLocationArrow /> },
];

const Nav = () => {
    const pathName = usePathname();

    return (
        <nav
            className="absolute flex flex-col items-center justify-center gap-y-4 h-max mt-auto 
      bottom-[10%] md:bottom-[4%] z-[50] top-0 w-full"
        >
            <div
                className="flex items-center justify-between gap-x-20 px-10
        bg-white/10 w-max h-20 backdrop-blur-sm text-xl rounded-3xl"
            >
                {navData.map((link, index) => {
                    return (
                        <Link
                            prefetch={false}
                            className={`${link.path === pathName && " bg-indigo-600/30 rounded-full p-1"
                                } relative flex items-center group hover:text-indigo-600 hover:scale-110 transition-all duration-300`}
                            key={index}
                            href={link.path}
                        >
                            <div className="absolute h-10 w-[90px] left-1/2 transform -translate-x-1/2 top-4 flex">
                                <div className="relative flex items-center justify-center w-full h-full rounded-xl">
                                    <div className="text-[12px] leading-none text-indigo-600 font-semibold capitalize">
                                        {link.name}
                                    </div>
                                </div>
                            </div>
                            <div>{link.icon}</div>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};

export default Nav;