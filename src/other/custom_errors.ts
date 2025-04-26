/*----------- CUSTOM ERRORS ----------- */

/**
 * This is a custom error thrown whenever there's a problem with
 * a provided input
 */
export class BadInputError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "BadInputError";
    }
}

/**
 * This is a custom error thrown whenever there's a problem with
 * an expected output
 */
export class BadOutputError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "BadInputError";
    }
}