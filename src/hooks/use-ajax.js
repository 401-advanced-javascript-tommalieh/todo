

function useAjax(url, method, item, id) {
    if (!id) {
        if (method === 'put' || method === 'delete') {
            return
        }
        else {
            if(method === 'get'){
            return fetch(url, {
                method: `${method}`,
                mode: 'cors',
            })
        }else{ 
            return fetch(url, {
                method: `${method}`,
                mode: 'cors',
                cache: 'no-cache',
                headers: { 'Content-Type': 'application/json' },
                body: item ? JSON.stringify(item) : {},
            })
        }
        }
    }
    else{
        return fetch(url, {
            method: `${method}`,
            mode: 'cors',
            cache: 'no-cache',
            headers: { 'Content-Type': 'application/json' },
            body: item ? JSON.stringify(item) : {},
        })
    }

    // return [fetchedData];
}

export default useAjax;