import React, { useState } from 'react'

export const useForm = <T extends object>(initialValue: T) => {

    const [value, setValue] = useState<T>(initialValue);

    const HandleInputChange = (data: object) => {
        setValue({
            ...value,
            ...data
        });
    }

    const reset = () => {
        setValue(initialValue);
    }

    return {
        value,
        HandleInputChange,
        reset
    }

}
