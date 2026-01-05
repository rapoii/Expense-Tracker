import { format, parseISO, isToday, isYesterday } from 'date-fns';
import { id } from 'date-fns/locale';

export const formatDate = (dateString, pattern = 'dd MMM yyyy') => {
    try {
        const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
        return format(date, pattern, { locale: id });
    } catch (error) {
        return dateString;
    }
};

export const formatRelativeDate = (dateString) => {
    try {
        const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
        if (isToday(date)) return 'Hari ini';
        if (isYesterday(date)) return 'Kemarin';
        return format(date, 'dd MMM yyyy', { locale: id });
    } catch (error) {
        return dateString;
    }
};
