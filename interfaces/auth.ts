export interface SignInFunc {
    (email: string, password: string): Promise<void>;
}

export interface SignUpFunc {
    (email: string, password: string): Promise<boolean | void>;
}

export interface SignOutFunc {
    (): Promise<boolean | void>;
}

export interface ProvideAuth {
    signIn: SignInFunc;
    signOut: SignOutFunc;
    signUp: SignUpFunc;
    user: object;
}
