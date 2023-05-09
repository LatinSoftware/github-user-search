
import { GITHUB_API_URL } from "../constant/indext";
import { GitHubUserType } from "../types";


class CustomError {
    code_error: number | undefined;
    message: string | undefined;

    constructor(code: number, message: string) {
        this.code_error = code;
        this.message = message;
    }
}

async function getUser(username: string | null): Promise<GitHubUserType> {

    if(username == null) throw new Error("cannot send null value");

    const response = await fetch(GITHUB_API_URL + username)

    const data = await response.json();

    if (!response.ok) {
        throw new CustomError(data.status_code, data.message);
    }

    return data as GitHubUserType;
}


export { getUser }