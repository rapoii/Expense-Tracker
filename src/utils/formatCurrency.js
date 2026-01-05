import { CURRENCIES } from '../data/currencies';

export const formatCurrency = (amount, currencyCode = 'IDR') => {
    const currency = CURRENCIES.find(c => c.code === currencyCode);
    const locale = currency ? currency.locale : 'en-US';

    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};
