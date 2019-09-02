import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// const devscoreApiEndpoint = process.env.DEVSCORE_API_ENDPOINT || "http://localhost:8090";

const devscoreApiEndpoint = 'http://' + (process.env.HOST_API || 'localhost')
        + ':' + (process.env.PORT_API || '8090'); // API Desarrollo
console.log('DEVSCORE API URL: ' + devscoreApiEndpoint);

/**
 * currentToken
 * ************ 
 * variable que va a guardar el token actual.
 */
let currentToken: string | null = null;
/**
 * currentRenewTokenPromise
 * ************************
 * Promesa de renovación de token.
 */
let currentRenewTokenPromise: any | undefined;
const axiosIntance: AxiosInstance = axios.create({
        baseURL: devscoreApiEndpoint,
        timeout: 30000
});

/**
 * Setea el token valido obtenido de la sesion iniciada o actual
 * *************************************************************
 * @param token token a setear.
 */
export function setCurrentToken(token: string | null) {
        console.log('Seteando nuevo token en el API', token);
        currentToken = token;
}

/**
 * axiosInstance.interceptors.request
 * **********************************
 * Se intercepta el request para colocar en el header el token del usuario logueado. 
 */
axiosIntance.interceptors.request.use(
        async (config: AxiosRequestConfig) => {
                console.log('Config headers', config.headers);
                // console.log('Config url', config.url);
                config.headers = Object.assign(config.headers, await getRequestHeaders(config.url));
                return config;
        },
        (error: any) => {
                return Promise.reject(error);
        }
);

/**
 * Configuracion del token en el header del request
 * ************************************************
 * @param requestUrl url de la consulta a la API
 */
async function getRequestHeaders(requestUrl: string | undefined): Promise<any> {
        const headers: any = {};
        if (currentToken) {
                // console.log('Colocando token', currentToken, ' en header del request');
                headers.Authorization = 'Bearer ' + currentToken;
        }
        return headers;
}

/**
 * axiosInstance.interceptors.response
 * ***********************************
 * Se intersepta el response para ver el estado de la sesion iniciada.
 */
axiosIntance.interceptors.response.use(
        (response: AxiosResponse) => {
                console.log('Response correcto', response);
                return response;
        },
        async (error: any) => {
                let errorToThrow: any;
                console.log('Response erroneo', error.response);
                if (error.response) {
                        try {
                                if (await renewTokenIfExpired(error.response, false)) {
                                        // Una vez renovado el token vuelvo a ejecutar el rest inicial
                                        console.log(
                                                'Reintentando request original luego de la renovación del token...'
                                        );
                                        return axiosIntance.request(error.config);
                                }
                        } catch (errorRenew) {
                                return Promise.reject(errorRenew);
                        }
                        errorToThrow = error.response.data;
                } else {
                        errorToThrow = error;
                }
                return Promise.reject(errorToThrow);
        }

);

/**
 * Checkea el status del error del response
 * ****************************************
 * @param errorResponse objeto que contiene el estado del response
 * @param renewToken booleano el cual si es false es porque el errorResponse tiene un status diferente al 401
 */
function renewTokenIfExpired(errorResponse: any, renewToken: boolean) {
        console.log('errorResponse', errorResponse);
        console.log('renewToken', renewToken);
        if (errorResponse.status === 401) {
                return getCurrentRenewTokenPromise().then(() => true);
        }
        return Promise.resolve(false);
}

/**
 * Le pide a la API un token valido para mantener la sesion iniciada
 * *****************************************************************
 */
function getCurrentRenewTokenPromise() {

        if (!currentRenewTokenPromise) {
                currentRenewTokenPromise = axiosIntance.post('users/renewToken')
                        .then(async (response: AxiosResponse) => {
                                console.log('RESPONSE TOKEN', response);
                                currentRenewTokenPromise = undefined;
                                currentToken = response.data;
                                console.log('Token renovado:', currentToken);
                                if (setCurrentToken) {
                                        await setCurrentToken(currentToken);
                                }
                                return currentToken;
                        }).catch((error: any) => {
                                currentRenewTokenPromise = undefined;
                                throw error;
                        });
        }
        return currentRenewTokenPromise;
}
console.log('axiosIntance.interceptors', axiosIntance.interceptors);
// console.log('currentToken', currentToken);

export default axiosIntance;