class CustomError extends Error {
    details?: Record<string, string>;
    status?: number;

    constructor(message?: string, status?: number, error?: Record<string, string>) {
        super(message ?? "Something went wrong");
        this.name = "CustomError";
        Object.setPrototypeOf(this, new.target.prototype);
        if (typeof (Error as any).captureStackTrace === "function") {
            (Error as any).captureStackTrace(this, CustomError);
        }
        this.details = error ?? undefined;
        this.status = status ?? undefined;
    }
}

export default CustomError