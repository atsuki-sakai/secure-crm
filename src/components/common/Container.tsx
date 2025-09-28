import { ReactNode } from "react";
export const Container = ({ children }: { children: ReactNode }) => {
    return <div className="max-w-7xl mx-auto w-full">{children}</div>;
}