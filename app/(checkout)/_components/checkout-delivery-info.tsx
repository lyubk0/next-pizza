"use client";

import {
  FormInput,
  FormTextarea,
} from "../../../components/shared/form-components";
import AutoComplete from "react-google-autocomplete";
import { WhiteBlock } from "../../../components/shared/white-block";
import { Controller, useFormContext } from "react-hook-form";
import { ErrorText } from "../../../components/shared/error-text";

interface Props {
  className?: string;
}

export const CheckoutDeliveryInfo: React.FC<Props> = ({ className }) => {
  return (
<<<<<<< HEAD
    <WhiteBlock title="3. Адреса доставки" className={className}>
=======
    <WhiteBlock title="3. Delivery address" className={className}>
>>>>>>> 1ad4e97 (migrated from next auth to better auth, improved ui)
      <div className="flex flex-col gap-5">
        <FormInput
          name={"address"}
          className="text-base"
<<<<<<< HEAD
          placeholder="Адреса"
=======
          placeholder="Address"
>>>>>>> 1ad4e97 (migrated from next auth to better auth, improved ui)
        />

        <FormTextarea
          name="comment"
          rows={5}
          className="text-base"
<<<<<<< HEAD
          placeholder="Коментар до замовлення"
=======
          placeholder="Order comment"
>>>>>>> 1ad4e97 (migrated from next auth to better auth, improved ui)
        />
      </div>
    </WhiteBlock>
  );
};
