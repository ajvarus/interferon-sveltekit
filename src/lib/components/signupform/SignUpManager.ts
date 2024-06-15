// src/lib/components/signupform/SignUpManager.ts

export class SignUpManager {
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static async checkIfEmailExists(email: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(email === "existing@example.com"); // Example email check
      }, 500);
    });
  }

  static validatePassword(password: string): boolean {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  static matchPasswords(password: string, confirmPassword: string): boolean {
    return password === confirmPassword;
  }

  static validateForm(
    isValidEmail: boolean,
    isPasswordValid: boolean,
    isConfirmPasswordValid: boolean,
    emailExists: boolean
  ): boolean {
    return (
      isValidEmail &&
      isPasswordValid &&
      (!emailExists ? isConfirmPasswordValid : true)
    );
  }
}
