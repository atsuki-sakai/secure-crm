import type { ReactNode } from "react";

export type DashboardLayoutProps = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <main>{children}</main>
    </div>
  );
};

export default DashboardLayout;
