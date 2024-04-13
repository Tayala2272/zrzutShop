

export default async function Pay(payment){
    const array = cart.map(x=>{
        if(lang == "pl"){
            return {
                "price_data":
                {
                    "currency":"pln",
                    "unit_amount":(x.price*100*exchangeRates.PLN).toFixed(),
                    "product_data":{
                        "name":x.name,
                        "description":"Opis produktu",
                    }
                },
                "quantity":x.amount
            }
        }
        if(lang == "en"){
            return {
                "price_data":
                {
                    "currency":"usd",
                    "unit_amount":(x.price*100).toFixed(),
                    "product_data":{
                        "name":x.name,
                        "description":"Opis produktu",
                    }
                },
                "quantity":x.amount
            }
        }
        if(lang == "ua"){
            return {
                "price_data":
                {
                    "currency":"uah",
                    "unit_amount":(x.price*100*exchangeRates.UAH).toFixed(),
                    "product_data":{
                        "name":x.name,
                        "description":"Opis produktu",
                    }
                },
                "quantity":x.amount
            }
        }
    })
    try {
        // fetch('https://app-ae7icdkcxq-uc.a.run.app/create-checkout-session/'+payment, {
        fetch('http://localhost:5001/zrzutshop/us-central1/app/create-checkout-session/'+payment, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(array),
        }).then(res=>res.json())
        .then(res=>window.location.href = res)                
    } catch (error) {
        // setError('Wystąpił błąd podczas tworzenia sesji płatności.');
        console.error(error);
    } finally {
        setIsCheckoutLoading(false);
    }
}