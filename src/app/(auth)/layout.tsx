import type { ReactNode } from "react";

import { Footer } from "@/components/common/Footer";
import { Header } from "@/components/common/Header";

export type AuthLayoutProps = {
  children: ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default AuthLayout;
