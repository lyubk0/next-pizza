import { Container, Header } from "@/components/shared";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
<<<<<<< HEAD
  title: "Next Pizza | Профіль",
=======
  title: "Next Pizza | Profile",
>>>>>>> 1ad4e97 (migrated from next auth to better auth, improved ui)
};

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <Suspense>
        {" "}
        <Header
          isShowMobileMenu={false}
          isShowProfile={false}
          isShowSearch={false}
          isShowCart={false}
          className="border-b-gray-200"
        />
      </Suspense>

      <Container>{children}</Container>
    </main>
  );
}
