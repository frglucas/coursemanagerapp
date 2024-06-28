export const NumberToMoney = (value: number) => {
    const currencyFractionDigits = new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
    }).resolvedOptions().maximumFractionDigits;
    
    const money = (value).toLocaleString('de-DE', {
        maximumFractionDigits: currencyFractionDigits,
        minimumFractionDigits: 2
    });

    return money
} 

export const MoneyToNumber = (value: string) => {
    return Number(value.replace(/[^0-9.-]+/g,"")) 
}