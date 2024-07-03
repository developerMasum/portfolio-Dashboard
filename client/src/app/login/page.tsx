import React from "react";
import Image from "next/image";
import SignInForm from "@/components/Forms/Auth/SignInForm";

const LoginPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 bg-white p-8 rounded-lg shadow-md">
        <div className="flex-shrink-0 hidden md:block">
          <Image
            src="https://img.freepik.com/vecteurs-libre/illustration-concept-abstrait-assurance-chomage-prestations-chomage-emploi-perdu-homme-affaires-stresse-fatigue-formulaire-reclamation-indemnisation-accidents-du-travail-paperasse-entretien_335657-192.jpg?w=826&t=st=1717663785~exp=1717664385~hmac=9ec73807457d87eb68dc469e21b17971ea22f66d6939c04c0ecfb62c45b20c00"
            width={400}
            height={400}
            alt="Login Illustration"
            className="rounded-lg"
          />
        </div>
        <div className="w-full max-w-md">
          <SignInForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
