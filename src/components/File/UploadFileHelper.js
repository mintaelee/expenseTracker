export const parseData = (data, bank) => {
    let filteredData = []
    let mappedData = []
    let _ = null

    switch (bank){
        
        case ('Chase'):
            _ = data.shift()
            filteredData = data.filter(transaction => transaction[5] < 10)
            mappedData = filteredData.map(transaction => {
                let reference = `${transaction[0]}${transaction[2]}${-transaction[5]}`
                let dateArr = transaction[0].split('/')
                let date = new Date(dateArr[2], dateArr[0]-1, dateArr[1])
                let newT = {
                    date: date,
                    name: transaction[2],
                    category: transaction[3],
                    amount: -transaction[5],
                    reference: reference
                }
                return newT
            })
            return mappedData

        case ('Amex'):
            filteredData = data.filter(transaction => transaction[7] > 0)
            mappedData = filteredData.map(transaction => {
                let dateArr = transaction[0].split(' ')[0].split('/')
                let date = new Date(dateArr[2], dateArr[0]-1, dateArr[1])
                let newT = {
                    date: date,
                    name: transaction[11],
                    category: 'UNIDENTIFIED',
                    amount: transaction[7],
                    reference: String(transaction[14])
                }
                return newT
            })
            return mappedData

        case ('Discover'):
            _ = data.shift()
            filteredData = data.filter(transaction => transaction[3] > 0)
            mappedData = filteredData.map(transaction => {
                let reference = `${transaction[0]}${transaction[2]}${-transaction[3]}`
                let dateArr = transaction[0].split('/')
                let date = new Date(dateArr[2], dateArr[0]-1, dateArr[1])
                if (transaction[4] === 'Restaurants') transaction[4] = 'Food & Drink'
                else if (transaction[4] === 'Travel/ Entertainment') transaction[4] = 'Travel'
                else if (transaction[4] === 'Supermarkets') transaction[4] = 'Groceries'
                else if (transaction[4] === 'Merchandise') transaction[4] = 'Shopping'
                else if (transaction[4] === 'Gasoline') transaction[4] = 'Gas'
                else if (transaction[4] === 'Services') transaction[4] = 'Professional Services'
                let newT = {
                    date: date,
                    name: transaction[2],
                    category: transaction[4],
                    amount: transaction[3],
                    reference: reference
                }
                return newT
            })
            return mappedData
        
        case ('BoA'):
            _ = data.shift()
            filteredData = data.filter(transaction => transaction[4] < 0)
            mappedData = filteredData.map(transaction => {
                let dateArr = transaction[0].split('/')
                let date = new Date(dateArr[2], dateArr[0]-1, dateArr[1])
                let newT = {
                    date: date,
                    name: transaction[2],
                    category: 'UNIDENTIFIED',
                    amount: -transaction[4],
                    reference: String(transaction[1])
                }
                return newT
            })
            return mappedData
        
        default:
            return mappedData
    }
}