interface IResponse {
    isSuccess: boolean;
    message: string;
    data?: any;
}

export function ApertreResponse({ isSuccess, message, data }: IResponse) {
    return {
        success: isSuccess ? 'ok' : 'no',
        message: message || '',
        data: data || {}
    }
}
