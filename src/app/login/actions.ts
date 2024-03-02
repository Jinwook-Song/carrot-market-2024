'use server';

export async function handleForm(prevState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  if (prevState === null) {
    return {
      sms: true,
    };
  } else if (prevState?.sms === true) {
    // check token
    return {
      ok: true,
    };
  } else
    return {
      errors: ['wrong password', 'password too short.'],
    };
}
