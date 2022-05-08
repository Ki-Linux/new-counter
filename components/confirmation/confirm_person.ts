import axios, { AxiosRequestConfig } from 'axios'

export function confirm (name: string) {

        const cookie = document.cookie;

        const only_first = cookie.split('%');

        const options: AxiosRequestConfig = {
            url: '/api/confirm_token',
            method: 'get',
            params: {
                username: name,
                divided_back: only_first[0],
            }
        }


        axios(options)
        .then((response) => {
            console.log(response.data);
            const which_num = response.data;

            console.log('yes');

            if(which_num === 0) {
                console.log('yes');
                location.href='/addInfo/login';
            }
        })

}