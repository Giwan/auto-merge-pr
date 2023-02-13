export const getErrorMessage = function (error: unknown) {
    return error instanceof Error ? error.message : String(error);
}