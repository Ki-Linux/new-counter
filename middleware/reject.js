export default function(context) {

    if(!context.store.getters.isAuthenticated) {
        context.redirect('/addInfo/login')
    }

}



/*export default function (it, username) {


        const name = username;

        const cookie = it;

        const only_first = cookie.split('%');


        axios.get('confirm_token', {
            params: {
                username: name,
                divided_back: only_first[0],
            }
            
        })
        .then((response) => {
            console.log(response.data);
            const which_num = response.data;

            if(which_num === 0) {
                console.log('yes');
            }
        })

    
    /*if(context.store.getters.isAuthenticated) {
        context.redirect('/addInfo/login')
    }*/
//}