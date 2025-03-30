export const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email) || 'Invalid email address';
  };
  
  export const validatePhoneNumber = (number: string) => {
    // number needs 10 digits
    const re = /^\d{10,}$/;
    return re.test(number) || 'Invalid phone number';
  };
  