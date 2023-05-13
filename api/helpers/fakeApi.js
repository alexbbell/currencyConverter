
exports.topTodayRates = (currency, dstCurrencies) => {
//Generates the data according to the public srv
    const curs = {'data' : {}}
    dstCurrencies.forEach(element => {
        curs['data'][element] = (Math.random() * 100.139133 / Math.random(90)).toFixed(6)
    });

    return curs
   
}


exports.latestRates = (source, dest) => {

    if(source == "USD" && dest == "EUR")  {
        return {
            "data": {
                "EUR": 0.911701
            }
        }
    }
    if(source == "USD" && dest == "BGN")  {
        return {
            "data": {
                "BGN": 1.775313
            }
        }
    }
    if(source == "USD" && dest == "ILS")  {
        return {
            "data": {
                "ILS": 3.621655
            }
        }
    }
    if(source == "USD" && dest == "MXN")  {
        return {
            "data": {
                "MXN":  13.597821
            }
        }
    }


    if(source == "EUR" && dest == "USD")  {
        return {
            "data": {
                "USD": 1.096851
            }
        }
    }


    if(source == "EUR" && dest == "BGN")  {
        return {
            "data": {
                "BGN": 1.947254
            }
        }
    }
    if(source == "EUR" && dest == "ILS")  {
        return {
            "data": {
                "ILS": 3.972415
            }
        }
    }

    if(source == "EUR" && dest == "USD")  {
        return {
            "data": {

                "USD": 1.096851
            }
        }
    }

    if(source == "EUR" && dest == "MXN")  {
        return {
            "data": {
                "MXN":  17.597821
            }
        }
    }



}