<<<<<<< HEAD
import { Checkbox } from "@/components/ui";
import React from "react";

export interface FilterChecboxProps {
  value: string;
  text: string;
  endAdornment?: React.ReactNode;
  onCheckedChange?: (checked: boolean) => void;
  checked?: boolean;
  name?: string;
}

export const FilterCheckbox: React.FC<FilterChecboxProps> = ({
  value,
  endAdornment,
  onCheckedChange,
  checked,
  text,
  name,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        onCheckedChange={onCheckedChange}
        checked={checked}
        value={value}
        className="rounded-[8px] w-6 h-6"
        id={`checkbox-${name}-${String(value)}`}
      />
      <label
        htmlFor={`checkbox-${name}-${String(value)}`}
        className="leading-none cursor-pointer flex-1 font-semibold"
      >
        {text}
      </label>
      {endAdornment}
    </div>
  );
};
=======
import { Checkbox } from '@/components/ui'
import React from 'react'

export interface FilterChecboxProps {
	value: string
	text: string
	endAdornment?: React.ReactNode
	onCheckedChange?: (checked: boolean) => void
	checked?: boolean
	name?: string
}

export const FilterCheckbox: React.FC<FilterChecboxProps> = ({
	value,
	endAdornment,
	onCheckedChange,
	checked,
	text,
	name,
}) => {
	return (
		<div className='flex items-center space-x-2'>
			<Checkbox
				onCheckedChange={onCheckedChange}
				checked={checked}
				value={value}
				className='size-5'
				id={`checkbox-${name}-${String(value)}`}
			/>
			<label
				htmlFor={`checkbox-${name}-${String(value)}`}
				className='leading-none text-sm cursor-pointer flex-1 font-semibold'
			>
				{text}
			</label>
			{endAdornment}
		</div>
	)
}
>>>>>>> 1ad4e97 (migrated from next auth to better auth, improved ui)
