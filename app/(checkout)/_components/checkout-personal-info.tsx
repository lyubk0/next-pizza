import React from "react";
import { WhiteBlock } from "../../../components/shared/white-block";
import { FormInput } from "../../../components/shared/form-components";

interface Props {
  className?: string;
}

export const CheckoutPersonalInfo: React.FC<Props> = ({ className }) => {
  return (
<<<<<<< HEAD
    <WhiteBlock title="2. Персональна інформація" className={className}>
      <div className="flex flex-col gap-3 md:grid md:grid-cols-2 md:gap-5">
        <FormInput name="firstName" className="text-base" placeholder="Ім'я" />
        <FormInput
          name="lastName"
          className="text-base"
          placeholder="Фамілія"
        />
        <FormInput name="email" className="text-base" placeholder="E-Mail" />
        <FormInput name="phone" className="text-base" placeholder="Телефон" />
=======
    <WhiteBlock title="2. Personal information" className={className}>
      <div className="flex flex-col gap-3 md:grid md:grid-cols-2 md:gap-5">
        <FormInput
          name="firstName"
          className="text-base"
          placeholder="First name"
        />
        <FormInput
          name="lastName"
          className="text-base"
          placeholder="Last name"
        />
        <FormInput name="email" className="text-base" placeholder="E-Mail" />
        <FormInput name="phone" className="text-base" placeholder="Phone" />
>>>>>>> 1ad4e97 (migrated from next auth to better auth, improved ui)
      </div>
    </WhiteBlock>
  );
};
